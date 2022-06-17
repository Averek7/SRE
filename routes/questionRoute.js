const express = require("express");
const router = express.Router();
const db = require("../component/Questions");
const fetchquiz = require("../middleware/fetchquiz");
const jwt = require("jsonwebtoken");
const fetchquestion = require("../middleware/fetchquestion");
const JWT_SECRET = "technoboot";

router.post("/add_question", fetchquiz, async (req, res) => {
  try {
    let status = false;
    const quiz_id = req.quiz.id;
    const { question, A, B, C, D, correct, marks } = req.body;
    const questions = await db.create({
      quiz_id,
      question,
      A,
      B,
      C,
      D,
      correct,
      marks,
    });

    const data = {
      questions: {
        id: questions.id,
      },
    };

    const questionToken = jwt.sign(data, JWT_SECRET);

    status = true;
    res.json({
      status,
      message: "Question Added Successfully",
      questionToken,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

router.get("/view_question", fetchquestion, async (req, res) => {
  try {
    const question_id = req.questions.id;
    const question = await db.findById(question_id);
    res.json({ question });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.get("/view_all_questions", async (req, res) => {
  try {
    const allQuestion = await db.find();
    res.json({ status: true, result: allQuestion });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

router.put("/update_question/:id", async (req, res) => {
  try {
    let status = false;
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status: false, message: "Not found" });
    }
    const data = await db.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res
        .status(404)
        .json({ status: false, message: "No question found" });
    }
    status = true;
    res.json({ status, message: "question updated statusfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(404)
      .json({ status: false, message: "No question found" });
  }
});
router.delete("/delete_question/:id", async (req, res) => {
  try {
    let status = false;
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status: false, message: "Not found" });
    }
    const data = await db.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .json({ status: false, message: "No question found" });
    }
    status = true;
    res.json({ status, message: "question deleted statusfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

module.exports = router;
