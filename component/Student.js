const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
    unique: true,
  },
  college_name: {
    type: String,
    required: true,
  },
  branch_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  profile: {},
});
const Student = mongoose.model("students", StudentSchema);
module.exports = Student;
