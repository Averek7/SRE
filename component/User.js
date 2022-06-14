const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
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
  },
  branch_name: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  caste: {
    type: String,
  },
  profile: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("users", UserSchema);
module.exports = User;
