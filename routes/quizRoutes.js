const router = require("express").Router();
const db = require("../component/Quiz");
const jwt = require("jsonwebtoken");
// const fetchquiz = require("../middleware/fetchquiz");
const questionDb = require("../component/Questions");
const JWT_SECRET = process.env.JWT_SECRET_Q;

router.post("/add_quiz", async (req, res) => {
  try {
    let status = false;
    const { name, date, time, subject, marks, duration } = req.body;
    const quiz = await db.create({
      name,
      date,
      time,
      subject,
      marks,
      duration,
    });

    const data = {
      quiz: {
        id: quiz.id,
      },
    };

    const quizToken = jwt.sign(data, JWT_SECRET);

    status = true;
    res.json({
      status,
      message: "Quiz added successfully",
      result: quizToken,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

router.get("/view_all_quiz", async (req, res) => {
  try {
    const allQuiz = await db.find();
    let status = true;
    res.json({ status, result: allQuiz });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

router.put("/update_quiz/:id", async (req, res) => {
  try {
    let status = false;
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status, message: "Not found" });
    }
    const data = await db.findByIdAndUpdate(id, req.body);

    status = true;
    res.json({ status, message: "Quiz updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});
router.delete("/delete_quiz/:id", async (req, res) => {
  try {
    let status = false;
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ status, message: "not found" });
    }
    const data = await db.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ status, message: "No quiz found" });
    }
    status = true;
    res.json({ status, message: "Quiz deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

router.get("/fetch_all_question_with_quizId/:id", async (req, res) => {
  try {
    const quiz_id = req.params.id;
    if (!quiz_id) {
      return res
        .status(404)
        .json({ status: false, message: "quiz id not found" });
    }
    const Questions = await questionDb.find({ quiz_id });
    res.json({ status: true, result: Questions });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});
module.exports = router;
