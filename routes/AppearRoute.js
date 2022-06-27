const route = require("express").Router();
const db = require("../component/Appear");
const Attempt = require("../component/Attempted");
const question = require("../component/Questions");
const fetchquiz = require("../middleware/fetchquiz");
const fetchStudent = require("../middleware/fetchStudent");
const quiz = require("../component/Quiz");
route.put("/start_exam", fetchStudent, fetchquiz, async (req, res) => {
  try {
    const student_id = req.student.id;
    const quiz_id = req.quiz.id;
    const check = await db.findOne({ student_id, quiz_id });

    if (check) {
      if (check.ended_time) {
        return res.json({
          status: false,
          message: "exam is already given by the student",
        });
      }
      const update = await db.updateOne(
        { student_id },
        { $set: { login_attempted: check.login_attempted + 1 } }
      );
      return res.json({ status: true, message: "login attempt updated" });
    }
    var started_time = new Date();
    started_time.setTime(started_time.getTime() + 19800000);
    const data = {
      $set: {
        student_id,
        quiz_id,
        started_time,
        login_attempted: 1,
      },
    };
    const option = { upsert: true };
    const create = await db.updateOne({ student_id }, data, option);
    res.json({ status: true, message: "new student join the exam" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

route.put("/end_exam", fetchStudent, fetchquiz, async (req, res) => {
  try {
    const student_id = req.student.id;
    const quiz_id = req.quiz.id;
    const check = await db.findOne({ student_id });
    if (!check) {
      return res.json({
        status: false,
        message: "No exam found for this student",
      });
    }
    if (check.ended_time) {
      return res.json({ status: false, message: "Exam already ended" });
    }
    var ended_time = new Date();
    ended_time.setTime(ended_time.getTime() + 19800000);
    var started_time = check.started_time;
    var time_took = ended_time.getTime() - started_time.getTime();
    var time_took = (time_took / 60000).toFixed(2);

    const attempt_data = await Attempt.find({ student_id, quiz_id });
    let total_marks = 0;
    for (let index = 0; index < attempt_data.length; index++) {
      if (
        attempt_data[index].correct_option ===
        attempt_data[index].option_selected
      ) {
        var question_id = attempt_data[index].question_id;

        var marks = await question.findById(question_id);
        marks = marks.marks;
        total_marks += marks;
      }
    }
    var parcentage = await quiz.findById(quiz_id);
    parcentage = parcentage.marks;
    parcentage = total_marks / parcentage;
    parcentage = parcentage * 100;

    const data = {
      $set: {
        ended_time,
        total_correct: req.body.total_correct,
        time_took,
        total_marks,
        percentage: parcentage,
      },
    };
    const endExam = await db.updateOne({ student_id }, data);
    res.json({
      status: true,
      message: "Thank you for participating in the exam",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

module.exports = route;
