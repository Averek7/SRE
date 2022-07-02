const express = require("express");
const router = express.Router();
const Attempt = require("../component/Attempted");
const Questions = require("../component/Questions");
const fetchstudent = require("../middleware/fetchStudent");

router.put("/:quizid/:quesid/attempted", fetchstudent, async (req, res) => {
  try {
    const student_id = req.student.id;
    const quiz_id = req.params.quizid;
    const question_id = req.params.quesid;
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

      res.status(200).send({
        student_id,
        quiz_id,
        question_id,
        option_selected: option_selected,
        message: "Option Selected",
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
});

module.exports = router;
