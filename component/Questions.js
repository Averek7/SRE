const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quiz", //required not added
  },
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
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
