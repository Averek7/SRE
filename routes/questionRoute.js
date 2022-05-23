const express = require("express");
const router = express.Router();
const db = require("../component/Questions");

router.post("/add_question", [], async (req, res) => {
  try {
    let status = false;
    const { question, option1, option2, option3, option4, correct, marks } =
      req.body;
    const data = await new db({
      question,
      option1,
      option2,
      option3,
      option4,
      correct,
      marks,
    });
    const savedData = await data.save();
    status = true;
    res.json({ status, message: "Question added successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Error Occurred");
  }
});

router.get("/view_all_questions", async (req, res) => {
  try {
    const allQuiz = await db.find();
    res.json();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occurred");
  }
});

router.put("/update_question/:id", async (req, res) => {
  try {
    let status = false;
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("Not found");
    }
    const data = await db.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(404).send("No question found");
    }
    status = true;
    res.json({ status, message: "question updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occurred");
  }
});
router.delete("/delete_question/:id", async (req, res) => {
  try {
    let status = false;
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("Not found");
    }
    const data = await db.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send("No question found");
    }
    status = true;
    res.json({ status, message: "question deleted successfully" });
  } catch (error) {
    res.status(500).send("Error Occurred");
  }
});

module.exports = router;
