const express = require('express');

const router = express.Router();
const Subscriber = require('../../models/subscriber');
const mongoose = require('mongoose');

router.post('/add', (req, res) => {
  Subscriber.find({ email: req.body.email })
    .exec()
    .then((subscribers) => {
      if (subscribers.length >= 1) {
        res.status(409).send({
          message: 'Email already exists',
        });
      } else {
        const subscriber = new Subscriber({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
        });
        subscriber
          .save()
          .then(() => {
            res.status(200).send({
              success: true,
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: err,
            });
          });
      }
    });
});

module.exports = router;
