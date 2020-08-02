const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  label: {
    type: String,
  },
  allDay: {
    type: Boolean,
  },
  selectable: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Schedule", taskSchema);
