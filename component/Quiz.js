const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const model = new mongoose.model("quiz", quizSchema);
module.exports = model;
