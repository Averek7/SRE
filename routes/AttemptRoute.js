const express = require("express");
const router = express.Router();
const Attempt = require("../component/Attempted");
const Questions = require("../component/Questions");
const fetchstudent = require("../middleware/fetchStudent");
const fetchquiz = require("../middleware/fetchquiz");
const fetchquestion = require("../middleware/fetchquestion");
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = "technoboot";

router.put(
  "/attempted",
  fetchstudent,
  fetchquiz,
  fetchquestion,
  async (req, res) => {
    try {
      const student_id = req.student.id;
      const quiz_id = req.quiz.id;
      const question_id = req.questions.id;
      const { option_selected } = req.body;

      if (!student_id) {
        res.status(404).send("Missing Credentials, Please Re-Login");
      }
      if (!quiz_id || !question_id) {
        res.status(404).send("No details found");
      }

      const Question = await Questions.findById(question_id.toString());
      const Attempts = await Attempt.findOne({
        student_id,
        quiz_id,
        question_id,
      });

      const correct_option = Question.correct;

      if (!Attempts) {
        const attempt = await Attempt.create({
          student_id,
          quiz_id,
          question_id,
          option_selected,
          correct_option,
        });
        const data = {
          attempt: {
            id: attempt.id,
          },
        };
        const attempt_token = jwt.sign(data, SECRET_TOKEN);
        res.status(200).send({
          student_id,
          quiz_id,
          question_id,
          option_selected: option_selected,
          message: "Option Selected",
          attempt_token,
        });
      }

      const update = await Attempt.updateOne(
        { student_id, quiz_id, question_id },
        { $set: { option_selected } }
      );

      res.status(200).send({
        student_id,
        quiz_id,
        question_id,
        option_selected: option_selected,
        message: "Option Updated",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Some Error Occurred");
    }
  }
);

module.exports = router;
