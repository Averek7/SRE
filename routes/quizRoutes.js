const router = require("express").Router();
const db = require("../component/Quiz");
const fetchadmin = require("../middleware/fetchAdmin");
const questionDb = require("../component/Questions");

router.post("/add_quiz", fetchadmin, async (req, res) => {
  try {
    const admin = req.admin.id;
    if (!admin) {
      return res
        .status(401)
        .json({ status, message: "only admin can add quiz" });
    }
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
    status = true;
    res.json({
      status,
      message: "Quiz added successfully",
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

router.put("/update_quiz/:id", fetchadmin, async (req, res) => {
  try {
    const admin = req.admin.id;
    if (!admin) {
      return res
        .status(401)
        .json({ status, message: "only admin can modify quiz" });
    }
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
router.delete("/delete_quiz/:id", fetchadmin, async (req, res) => {
  try {
    const admin = req.admin.id;
    if (!admin) {
      return res
        .status(401)
        .json({ status, message: "only admin can delete quiz" });
    }
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

router.get("/:quizid/view_all_questions", async (req, res) => {
  try {
    const quiz_id = req.params.quizid;
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
router.get("/view_quiz/:quizid",async (req,res)=>{
  try {
    const quiz_id = req.params.quizid;
    if (!quiz_id) {
      return res
        .status(404)
        .json({ status: false, message: "quiz id not found" });
    }
    console.log(quiz_id)
    const quiz = await db.findById(quiz_id)
    console.log(quiz)
    if(!quiz){
     return res.json({ status:false, message: "no quiz found" });
    }
    res.json({status : true,Data : quiz})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "internal server error" });
  }
})
