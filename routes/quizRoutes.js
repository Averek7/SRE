const router = require("express").Router();
const db = require("../component/Quiz");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchquiz = require("../middleware/fetchquiz");
const JWT_SECRET = "technoboot";

router.post(
  "/add_quiz",
  [
    body("name", "name is empty").exists(),
    body("date", "date is empty").exists(),
    body("time", "time is empty").exists(),
    body("subject", "subject is empty").exists(),
    body("marks").exists().isNumeric(),
    body("duration").exists().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
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
  }
);

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

router.get("/view_quiz", fetchquiz, async (req, res) => {
  try {
    const quiz = await db.findById(req.quiz.id);
    res.json({ quiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});
module.exports = router;
