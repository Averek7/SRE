const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Admin = require("../component/Admin");
const fetchadmin = require("../middleware/fetchAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_token_user";

router.get("/get_all_admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json({ admin });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Some error occurred", { message: "Cannot fetch admins" });
  }
});

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

    let success;

    const { email, password, name, phone_no, profile } = req.body;
    try {
      let Eadmin = await Admin.findOne({ email });
      let Padmin = await Admin.findOne({ phone_no });
      if (Eadmin || Padmin) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Sorry ! Admin already exists" });
      }

      //   Hash
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      //   New Admin
      admin = await Admin.create({
        email,
        password: hashPassword,
        name,
        phone_no,
        profile,
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
      let admin = await Admin.findOne({ email });
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
      res.json({ success, message: "Successfully Signed In", authToken });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .send("Some error occurred", { message: "Failed Sign In" });
    }
  }
);

router.put("/update_admin", fetchadmin, async (req, res) => {
  try {
    let success = false;
    let admin_update = await Admin.findById(req.admin.id);

    if (!admin_update) {
      return res.status(401).send("Access Denied");
    }

    let user_id = admin_delete.id.toString();

    admin_update = await Admin.findByIdAndUpdate(user_id, req.body);
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
    let admin_delete = await Admin.findById(req.admin.id);

    if (!admin_delete) {
      return res.status(401).send("Access Denied");
    }

    let user_id = admin_delete.id.toString();

    admin_delete = await Admin.findByIdAndDelete(user_id);
    if (!admin_delete) {
      res.status(404).send("No parameters found");
    } else {
      success = true;
      res.json({
        success,
        message: "Successfully Deleted Admin",
        admin_delete,
      });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Some error occurred", { message: "Failed Admin Deletion" });
  }
});

module.exports = router;
