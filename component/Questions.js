const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizzes",
  },
  question: {
    type: String,
    required: true,
  },
  A: {
    type: String,
    required: true,
  },
  B: {
    type: String,
    required: true,
  },
  C: {
    type: String,
    required: true,
  },
  D: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});
const model = new mongoose.model("question", questionSchema);
module.exports = model;
