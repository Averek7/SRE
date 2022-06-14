const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttemptSchema = new Schema({
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizzes",
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  option_selected: {
    type: String,
    default: null,
    required: true,
  },
  correct_option: {
    type: String,
    required: true,
  },
});

const Attempt = mongoose.model("attempts", AttemptSchema);
module.exports = Attempt;
