const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
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
  profile: {},
});
const Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;
