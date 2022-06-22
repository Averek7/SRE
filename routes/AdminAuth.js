const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchAdmin");
const fetchquiz = require("../middleware/fetchquiz");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../component/User");
const Appear = require("../component/Appear");

const JWT_SECRET = "secret_token_user";

router.get("/dashboard", fetchquiz, async (req, res) => {
  const quiz_id = req.quiz.id;
  const attended = await Appear.find({ quiz_id }).sort({ percentage: -1 });
  console.log(attended);
  var arr = [];
  for (let index = 0; index < attended.length; index++) {
    const element = attended[index];

    var obj = {};
    const std_id = element.student_id;
    const std_data = await User.findById(std_id);
    obj.name = std_data.name;
    obj.profile = std_data.profile;
    obj.time_spend = element.time_took;
    obj.time_out = element.ended_time;
    obj.percentage = element.percentage;
    if (obj.percentage > 33) {
      obj.result = "Passed";
    } else {
      obj.result = "Failed";
    }
    if (obj.percentage > 89) {
      obj.grade = "Outstanding";
    } else if (obj.percentage > 79 && obj.percentage < 90) {
      obj.grade = "Excellent";
    } else if (obj.percentage > 69 && obj.percentage < 80) {
      obj.grade = "Very Good";
    } else if (obj.percentage > 59 && obj.percentage < 70) {
      obj.grade = "Good";
    } else if (obj.percentage > 49 && obj.percentage < 60) {
      obj.grade = "Satisfactory";
    } else if (obj.percentage > 39 && obj.percentage < 50) {
      obj.grade = "fair";
    } else if (obj.percentage > 33 && obj.percentage < 40) {
      obj.grade = "Passed";
    } else {
      obj.grade = "Fail";
    }
    arr.push(obj);
  }
  res.json({ status: true, result: arr });
});

router.get("/get_admins", async (req, res) => {
  try {
    const admin = await User.find({ type: "A" }).select("-password");
    if (!admin) {
      res.status(404).send("No details found");
    }
    res.status(200).json({ message: "Fetched Successfully", admin });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Some error occurred", { message: "Cannot fetch admins" });
  }
});

router.post("/signup", async (req, res) => {
  let success;
  const { email, password, name, phone_no, profile, type } = req.body;
  try {
    let checkAdmin = await User.findOne({ email, phone_no });
    if (checkAdmin) {
      success = false;
      return res.status(400).json({
        success,
        error:
          "Sorry ! Admin already exists with entered email or phone number",
      });
    }

    //   Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //   New User
    admin = await User.create({
      email,
      password: hashPassword,
      name,
      phone_no,
      profile,
      type,
    });

    const data = {
      admin: {
        id: admin.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({
      success,
      message: `Successfully Merged User ${name}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occurred", { message: "Failed Sign Up" });
  }
});

router.post("/login_email", async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await User.findOne({ email, type: "A" });
    if (!admin) {
      res.status(400).json({ errors: "Please enter correct credentials" });
    }
    let success;
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      res
        .status(400)
        .json({ success, errors: "Please enter correct credentials" });
    }
    const payLoad = {
      admin: {
        id: admin.id,
      },
    };
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    success = true;
    res.json({
      success,
      message: "Successfully Signed In",
      type: admin.type,
      authToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred", { message: "Failed Sign In" });
  }
});

router.post("/login_phone", async (req, res) => {
  const { phone_no, password } = req.body;
  try {
    const admin = await User.findOne({ phone_no, type: "A" });
    if (!admin) {
      res.status(400).send({ errors: "Please enter correct credentials" });
    }
    let status;
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      res
        .status(400)
        .json({ status, errors: "Please enter correct credentials" });
    }
    const payLoad = {
      admin: {
        id: admin.id,
      },
    };
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    status = true;
    res.json({
      status,
      message: "Successfully Signed In",
      type: admin.type,
      authToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.put("/change_password", fetchadmin, async (req, res) => {
  const { current_password, confirm_password, new_password } = req.body;
  try {
    let status = false;
    const admin_id = req.admin.id.toString();
    const admin = await User.findById(admin_id);
    if (!admin) {
      res.status(404).send("Login Required ! User Not Found");
    }
    if (current_password !== confirm_password) {
      res.status(400).json({ status, error: "Password mismatch" });
    }
    const checkPassword = await bcrypt.compare(
      current_password,
      admin.password
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

router.put("/update_admin", fetchadmin, async (req, res) => {
  try {
    let success = false;
    let admin_update = await User.findById(req.admin.id);

    if (!admin_update) {
      return res.status(401).send("Access Denied");
    }
    let user_id = admin_delete.id.toString();

    admin_update = await User.findByIdAndUpdate(user_id, req.body);
    if (!admin_update) {
      res.status(404).send("No parameters found");
    } else {
      success = true;
      res.json({ success, message: "Successfully Updated", admin_update });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.delete("/delete_admin", fetchadmin, async (req, res) => {
  try {
    let success = false;
    let admin_delete = await User.findById(req.admin.id);

    if (!admin_delete) {
      return res.status(401).send("Access Denied");
    }

    let user_id = admin_delete.id.toString();

    admin_delete = await User.findByIdAndDelete(user_id);
    if (!admin_delete) {
      res.status(404).send("No parameters found");
    } else {
      success = true;
      res.json({
        success,
        message: "Successfully Deleted User",
        admin_delete,
      });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Some error occurred", { message: "Failed User Deletion" });
  }
});

module.exports = router;
