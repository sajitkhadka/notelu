const express = require("express");
let User = require("../../models/user");
let Schedule = require("../../models/schedule");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const checkAuth = require("../../middleware/check-auth");
const findUser = require("../../middleware/findUser");
const { response } = require("express");

router.get("/posts", checkAuth, (req, res) => {
  res.json(posts.filter((post) => post.username === req.userData.email));
});
router.get("/user", checkAuth, (req, res) => {
  res.status(200).send(req.userData);
});

router.post("/add", checkAuth, findUser, (req, res) => {
  const schedule = new Schedule({
    _id: new mongoose.Types.ObjectId(),
    user: req.user,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    label: req.body.label,
    allDay: req.body.allDay,
    selectable: req.body.selectable,
  });
  schedule.save().then((result) => {
    res.status(200).send({
      success: true,
      schedule: {
        id: result._id,
        title: result.title,
        start: result.start,
        end: result.end,
        label: result.label,
        allDay: result.allDay,
        selectable: result.selectable,
      },
    });
  });
});

router.get("/", checkAuth, findUser, (req, res) => {
  Schedule.find({ user: req.user })
    .exec()
    .then((schedules) => {
      if (schedules.length >= 1) {
        res.status(200).send({
          schedule: schedules.map((schedule) => {
            return {
              id: schedule._id,
              title: schedule.title,
              start: schedule.start,
              end: schedule.end,
              label: schedule.label,
              allDay: schedule.allDay,
              selectable: schedule.selectable,
            };
          }),
        });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "couldn't find any schedules" });
      }
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.delete("/", checkAuth, findUser, (req, res) => {
  Schedule.findByIdAndRemove({ _id: req.body.id })
    .exec()
    .then((result) => {
      return res.status(200).send({ success: true, id: result._id });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.post("/add", checkAuth, findUser, (req, res) => {
  const schedule = new Schedule({
    _id: new mongoose.Types.ObjectId(),
    user: req.user,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    label: req.body.label,
    allDay: req.body.allDay,
    selectable: req.body.selectable,
  });
  schedule.save().then((result) => {
    res.status(200).send({
      success: true,
      schedule: {
        id: result._id,
        title: result.title,
        start: result.start,
        end: result.end,
        label: result.label,
        allDay: result.allDay,
        selectable: result.selectable,
      },
    });
  });
});

router.put("/", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.body.id);
    if (!schedule) {
      return res
        .status(409)
        .send({ success: false, error: "Schedule not found" });
    }
    schedule.title = req.body.title;
    schedule.start = req.body.start;
    schedule.end = req.body.end;
    schedule.label = req.body.label;
    schedule.selectable = req.body.selectable;
    schedule.allDay = req.body.allDay;
    const result = await schedule.save();
    res.status(200).send({
      success: true,
      schedule: {
        id: result._id,
        title: result.title,
        start: result.start,
        end: result.end,
        label: result.label,
        allDay: result.allDay,
        selectable: result.selectable,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
