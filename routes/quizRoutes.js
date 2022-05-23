const router = require("express").Router();
const db = require("../component/Quiz");
router.post("/add_quiz", async (req, res) => {
  try {
    let status = false;
    const { name, date, time, subject, marks, duration } = req.body;
    const data = await new db({
      name,
      date,
      time,
      subject,
      marks,
      duration,
    });
    const savedData = await data.save();
    status = true;
    res.json({ status, message: "Quiz added successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Error Occurred");
  }
});

router.get("/view_all_quiz", async (req, res) => {
  try {
    const allQuiz = await db.find();
    res.json({ allQuiz });
    res.json();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occurred");
  }
});

router.put("/update_quiz/:id", async (req, res) => {
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
    res.json({ status, message: "Quiz updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occurred");
  }
});
router.delete("/delete_quiz/:id", async (req, res) => {
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
    res.json({ status, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).send("Error Occurred");
  }
});
module.exports = router;
