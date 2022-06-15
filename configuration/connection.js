require("dotenv").config();
const mongoose = require("mongoose");

const connectionMongo = () => {
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Database Connected !");
  });
};
module.exports = connectionMongo;
