const express = require("express");
const router = express.Router();
const db = require("../component/Questions");
const fetchadmin = require("../middleware/fetchAdmin");

router.post("/:quizid/add_question", fetchadmin, async (req, res) => {
  try {
    const admin = req.admin.id;
    if (!admin) {
      return res
        .status(401)
        .json({ status, message: "only andmin can modify questions" });
    }
    let status = false;
    const quiz_id = req.params.quizid;
    if (!quiz_id) {
      return res.status(404).json({ status: false, message: "Not found" });
    }
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

    status = true;
    res.json({
      status,
      message: "Question Added Successfully",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
});

router.get("/:quizid/view_question/:quesid", async (req, res) => {
  try {
    let status = false;
    const quiz_id = req.params.quizid;
    if (!quiz_id) {
      return res.status(404).json({ status: false, message: "Quiz Not Found" });
    }
    const question_id = req.params.quesid;
    if (!question_id) {
      return res
        .status(404)
        .json({ status: false, message: "Question Not found" });
    }
    const question = await db.findById(question_id);
    res.json({
      status: true,
      message: "Fetched Question Successfully ",
      question,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.put("/update_question/:id", fetchadmin, async (req, res) => {
  try {
    const admin = req.admin.id;
    if (!admin) {
      return res
        .status(401)
        .json({ status, message: "only andmin can modify questions" });
    }
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
router.delete("/delete_question/:id", fetchadmin, async (req, res) => {
  try {
    const admin = req.admin.id;
    if (!admin) {
      return res
        .status(401)
        .json({ status, message: "only andmin can modify questions" });
    }
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
