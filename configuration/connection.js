const mongoose = require("mongoose");
 const MONGO_URI = `mongodb+srv://mongo:mongopassword@technoboot-rmisn.mongodb.net/sreexam?retryWrites=true&w=majority`;
// const MONGO_URI = `mongodb://localhost:27017/skyriderexam?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;

const connectionMongo = () => {
  mongoose.connect(MONGO_URI,{useNewUrlParser : true} ,() => {
    console.log("Database Connected !");
  });
};
module.exports = connectionMongo;
