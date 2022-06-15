require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI = `mongodb+srv://mongo:mongopassword@technoboot-rmisn.mongodb.net/sreexam?retryWrites=true&w=majority`;

const connectionMongo = () => {
  mongoose.connect(MONGO_URI, () => {
    console.log("Database Connected !");
  });
};
module.exports = connectionMongo;
