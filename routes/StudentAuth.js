const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Student = require("../component/Student");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_token_user";
const bcrypt = require("bcryptjs");
const fetchstudent = require("../middleware/fetchStudent");

router.post(
  "/signup",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must have minimum 8 characters")
      .isAlphanumeric()
      .isLength({ min: 8 }),
    body("name", "Enter valid name").isLength({ max: 25 }),
    body("phone_no", "Enter valid phone number").isNumeric().isLength(10),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let status;

    const {
      email,
      password,
      name,
      phone_no,
      college_name,
      branch_name,
      gender,
      dob,
      caste,
      profile,
    } = req.body;
    try {
      let Estudent = await Student.findOne({ email });
      let Pstudent = await Student.findOne({ phone_no });
      if (Estudent || Pstudent) {
        status = false;
        return res
          .status(400)
          .json({ status, error: "Sorry ! Student already exists" });
      }

      //   Hash
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      //   New Student
      student = await Student.create({
        email,
        password: hashPassword,
        name,
        phone_no,
        college_name,
        branch_name,
        gender,
        dob,
        caste,
        profile,
      });

      const data = {
        student: {
          id: student.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      status = true;
      res.json({ status, message: "Successfully Signed-Up" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error Occurred");
    }
  }
);

router.post(
  "/login_email",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must have minimum 8 characters")
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let student = await Student.findOne({ email });
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
  }
);

router.post(
  "/login_phone",
  [
    body("phone_no", "Enter valid phone number").isNumeric().isLength(10),
    body("password", "Password must have minimum 8 characters")
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    const { phone_no, password } = req.body;
    try {
      const student = await Student.findOne({ phone_no });
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
  }
);

router.get("/view_profile", fetchstudent, async (req, res) => {
  let status = false;
  try {
    const profile = await Student.find({ student: req.student.id }).select(
      "-password"
    );
    status = true;
    res.json({ status, message: "Profiles Fetched", profile });
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

    let profile_update = await Student.findById(req.student.id);
    if (!profile_update) {
      return res.status(401).send("Access Denied");
    }

    let student_id = profile_update.id.toString();

    profile_update = await Student.findByIdAndUpdate(
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
