const express = require("express");
let User = require("../../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var http = require("http");
var url = require("url");
const router = express.Router();

const checkAuth = require("../../middleware/check-auth");
let fetch = require("node-fetch");

/*for google by nelle*/
const { OAuth2Client } = require("google-auth-library");
/*end of notes*/

/*Prekshya */
const mailjet = require("node-mailjet").connect(
  "ce321cc20ccd17252fa150a6d6265d2c",
  "6259a56ab5ac06b1196203db16259d70"
);
const request = mailjet;

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

//Checks the email is registered or not
//if not then ends a verification email with a link
router.post("/register", (req, res, next) => {
  var hostname = req.headers.host;
  const { name, dob, email, password } = req.body;
  User.find({ email }).exec((err, user) => {
    if (user.length >= 1) {
      return res
        .status(409)
        .json({ error: "An account with the email already exists. " });
    } else {
      const token = jwt.sign(
        { name, dob, email, password },
        process.env.JWT_KEY,
        {
          expiresIn: "20m",
        }
      );

      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "n01323774@humbermail.ca",
              Name: "Prekshya",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Account Activation Link.",
            HTMLPart: `<h3> Please click on given link to activate your account<a href="http://${hostname}/api/users/authentication/${token}">Click Here</a></h3>`,
            CustomID: "AppGettingStartedTest",
          },
        ],
      });
      request
        .then((result) => {
          console.log(result.body);
          res.json({
            message: "Email has been sent. Please activate your account",
            token: token,
          });
        })
        .catch((err) => {
          res.status(409).json({
            message: "Error sending message to email",
          });
          console.log(err.statusCode);
        });
    }
  });
});

//When link is clicked, registered the user and signup process is complete
router.get("/authentication/:token/", (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "Incorrect or expired token" });
      } else {
        const { name, dob, email, password } = decodedToken;
        console.log(decodedToken);
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: name,
              email: email,
              dob: dob,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  success: true,
                  message: "Sign up success!",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  message: "Error in signing up",
                });
              });
          }
        });
      }
    });
  } else {
    return res.json({ error: "Something went wrong!!" });
  }
});

//for getting the token for reseting password
router.post("/forgotpassword", (req, res) => {
  const { email } = req.body;
  console.log(email);
  User.find({ email }).exec((err, user) => {
    if (user.length >= 1) {
      console.log(user[0].id);
      console.log(user[0]._id);
      const token = jwt.sign(
        { id: user[0]._id },
        process.env.RESET_PASSWORD_KEY,
        {
          expiresIn: "20m",
        }
      );

      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "n01323774@humbermail.ca",
              Name: "Prekshya",
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: "Password Reset Link.",
            HTMLPart: `<h3> Please click on given link to reset your password <a href="http://${req.headers.host}/api/users/forgotpassword/${token}">Click Here</a></h3>`,
            CustomID: "AppGettingStartedTest",
          },
        ],
      });
      return User.updateOne({ resetLink: token }, (err, success) => {
        if (err) {
          return res.status(400).json({ error: "Reset password link error!" });
        } else {
          request
            .then((result) => {
              console.log(result.body);
              res.json({
                message:
                  "Email has been sent. You can now reset your password!",
                token: token,
              });
            })
            .catch((err) => {
              res.status(409).json({
                message: "Error reseting your password",
              });
              console.log(err.statusCode);
            });
        }
      });
    } else {
      res.status(409).json({
        message: "Email Not found",
      });
    }
  });
});

router.post("/forgotpassword/:token", (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.RESET_PASSWORD_KEY, function (
      error,
      decodedToken
    ) {
      if (error) {
        return res.json({
          error: "Incorrect token or token is expired",
        });
      }
      console.log(decodedToken);
      const id = decodedToken.id;
      console.log(id);
      User.findById(id)
        .then((user) => {
          bcrypt.hash(newPassword, 10, (err, hash) => {
            if (!err) {
              user.password = hash;
              const result = user.save();
              res.status(200).send({
                success: true,
              });
            } else {
              res.status(400).send(err);
            }
          });
        })
        .catch((err) => {
          res.status(400).send({
            error: err,
          });
        });
    });
  } else {
    return res.status(409).json({ error: "Authentication error! " });
  }
});

/*added by nelle profile update*/
router.post("/update", checkAuth, (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    let { name, email, dob, password } = user;

    if (req.body.name) name = req.body.name;
    if (req.body.dob) dob = req.body.dob;
    if (req.body.password) password = req.body.password;
    let phone;
    if (req.body.phone) phone = req.body.phone;

    User.findOneAndUpdate(
      { email: req.body.email },
      { name, email, dob, password, phone },
      { new: true }
    ).exec((err, user) => {
      if (err) {
        console.log(err);
      }
      res.json({ user });
    });
  });
});
/*end of new profile*/

router.get("/auth", checkAuth, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
  });
});

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

module.exports = router;
