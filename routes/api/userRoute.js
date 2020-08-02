const express = require("express");
let User = require("../../models/user");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const checkAuth = require("../../middleware/check-auth");
let fetch = require("node-fetch");

/*for google by nelle*/
const { OAuth2Client } = require("google-auth-library");
/*end of notes*/

router.post("/login", (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            isAuthenticated: true,
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/register", (req, res, next) => {
  //Signup request format
  //{ firstName,
  // lastName:,
  // email:,
  // bday: ,
  // phone: ,
  // password: }
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "An account with the email acount already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              dob: req.body.dob,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  success: true,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  message: err,
                });
              });
          }
        });
      }
    });
});

router.get("/auth", checkAuth, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
  });
});

const posts = [
  {
    username: "sajitkhadka@gmail.com",
    title: "I am good. hehehe.",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

/*added by nelle for google login*/
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post("/google-login", (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      //if successful
      console.log("google login response", response);
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          //if user is found
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, name, dob } = user;
            return res.json({
              token,
              user: { _id, email, name, dob },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                return res
                  .status(400)
                  .json({ error: "User signup failed with google" });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, email, name } = data;
              return res.json({
                token,
                user: { _id, email, name },
              });
            });
          }
        }); //findone
      } else {
        console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
        return res.status(400).json({
          error: "Google login failed, verify if email exist then try again",
        });
      }
    });
});

/*nothing follows for google login by nelle*/

router.get("/posts", checkAuth, (req, res) => {
  res.json(posts.filter((post) => post.username === req.userData.email));
});

module.exports = router;
