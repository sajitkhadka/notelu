let User = require("../models/user");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  User.find({ email: req.decoded.email })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        req.user = users[0];
        next();
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Authentication Error!" });
      }
    })
    .catch((err) => {
      return res.status(200).send(err);
    });
};
