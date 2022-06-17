const express = require("express");
const router = express.Router();
const User = require("../component/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_token_user";
const bcrypt = require("bcryptjs");
const fetchstudent = require("../middleware/fetchStudent");

router.get("/get_all_students", async (req, res) => {
  try {
    const student = await User.find({ type: "S" });
    res.json({ student });
  } catch (error) {
    console.error(error.message);
    res.json("Some Error Occurred");
  }
});
router.post("/signup", async (req, res) => {
  let status;
  const {
    email,
    password,
    name,
    phone_no,
    college_name,
    branch_name,
    education,
    gender,
    dob,
    caste,
    profile,
    type,
  } = req.body;
  try {
    let Estudent = await User.findOne({ email });
    let Pstudent = await User.findOne({ phone_no });
    if (Estudent || Pstudent) {
      status = false;
      return res.status(400).json({
        status,
        error:
          "Sorry ! Student already exists with entered email or phone number",
      });
    }

    //   Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //   New User
    student = await User.create({
      email,
      password: hashPassword,
      name,
      phone_no,
      college_name,
      branch_name,
      education,
      gender,
      dob,
      caste,
      profile,
      type,
    });

    const data = {
      student: {
        id: student.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    status = true;
    res.json({ status, message: `Successfully Signed-Up as ${name}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occurred");
  }
});

router.post("/login_email", async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await User.findOne({ email });
    if (!student) {
      res.status(400).json({ errors: "Please enter correct credentials" });
    }
    let status;
    const comparePassword = await bcrypt.compare(password, student.password);
    if (!comparePassword) {
      res
        .status(400)
        .json({ status, errors: "Please enter correct credentials" });
    }
    const payLoad = {
      student: {
        id: student.id,
      },
    };
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    status = true;
    res.json({ status, message: "Successfully Signed In", authToken });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Some error occurred");
  }
});

router.post("/login_phone", async (req, res) => {
  const { phone_no, password } = req.body;
  try {
    const student = await User.findOne({ phone_no });
    if (!student) {
      res.status(400).send({ errors: "Please enter correct credentials" });
    }
    let status;
    const comparePassword = await bcrypt.compare(password, student.password);
    if (!comparePassword) {
      res
        .status(400)
        .json({ status, errors: "Please enter correct credentials" });
    }
    const payLoad = {
      student: {
        id: student.id,
      },
    };
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    status = true;
    res.json({ status, message: "Successfully Signed In", authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.get("/view_profile", fetchstudent, async (req, res) => {
  let status = false;
  try {
    const student_id = req.student.id;
    const profile = await User.findById(student_id.toString()).select(
      "-password"
    );
    status = true;
    res.json({ status, message: "Profile Fetched", profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.put("/change_password", fetchstudent, async (req, res) => {
  const { current_password, confirm_password, new_password } = req.body;
  try {
    let status = false;
    const student_id = req.student.id.toString();
    const student = await User.findById(student_id);
    if (!student) {
      res.status(404).send("Login Required ! User Not Found");
    }
    if (current_password !== confirm_password) {
      res.status(400).json({ status, error: "Password mismatch" });
    }
    const checkPassword = await bcrypt.compare(
      current_password,
      student.password
    );
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(new_password, salt);
    if (!checkPassword) {
      res.status(400).json({ status, errors: "Please enter correct password" });
    }
    password_update = await User.findByIdAndUpdate(admin_id, {
      password: hashPassword,
    });
    status = true;
    res.status(200).json({ status, message: "Successfully Updated Password" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.put("/update_profile/", fetchstudent, async (req, res) => {
  try {
    let status = false;

    // const { name } = req.body;
    // const newProfile = {};
    // if (name) {
    //   newProfile.name = name;
    // }

    let profile_update = await User.findById(req.student.id);
    if (!profile_update) {
      return res.status(401).send("Access Denied");
    }

    let student_id = profile_update.id.toString();

    profile_update = await User.findByIdAndUpdate(
      student_id,
      req.body
      // { $set: newProfile },
      // { new: true }
    );
    if (!profile_update) {
      res.status(404).send("No parameters found");
    } else {
      status = true;
      res.json({
        status,
        message: "Successfully Updated Profile",
        profile_update,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

module.exports = router;
