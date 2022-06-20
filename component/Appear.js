const mongoose = require("mongoose");

const AppearSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizzes",
    },
    started_time: {
      type: Date,
      required: true,
    },
    login_attempted: {
      type: Number,
      default: 1,
    },
    ended_time: {
      type: Date,
    },
    time_took: {
      type: String,
    },
    total_marks: {
      type: Number,
    },
    parcentage : {
      type : Number
    }
  },
  { versionKey: false }
);
const model = new mongoose.model("appear", AppearSchema);
module.exports = model;
