const express = require("express");
let User = require("../../models/user");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const checkAuth = require("../../middleware/check-auth");
let fetch = require("node-fetch");

const events = [
  {
    id: 1,
    title: "Mern Assignment",
    start: "2020-07-25 5:02 am",
    end: "2020-07-25 7:02 am",
    label: "college",
    allDay: false,
    selectable: true,
  },
  {
    id: 2,
    title: "Work",
    start: "2020-07-20 1:02 pm",
    end: "2020-07-20 3:02 pm",
    label: "work",
    allDay: false,
    selectable: true,
  },
  {
    id: 3,
    title: "Learn Guitar",
    start: "2020-07-20 5:02 pm",
    end: "2020-07-20 7:02 pm",
    label: "home",
    allDay: false,
    selectable: true,
  },
  {
    id: 4,
    title: "Learn Dancing",
    start: "2020-07-20 9:02 pm",
    end: "2020-07-20 10:02 pm",
    label: "home",
    allDay: false,
    selectable: true,
  },
];

const categories = ["home", "college", "work"];

router.get("/events", (req, res) => {
  res.json(events);
});

router.get("/categories", (req, res) => {
  res.json(categories);
});

module.exports = router;
