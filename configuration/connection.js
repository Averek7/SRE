// prod_url = "mongodb+srv://mongo:mongopassword@technoboot-rmisn.mongodb.net/delhisatta?retryWrites=true&w=majority"
// prod_url = "mongodb+srv://mongo:mongopassword@satta.rzil2.mongodb.net/nepaltwo?retryWrites=true&w=majority"

const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/skyriderexam?readPreference=primary&directConnection=true&ssl=false";

// local mongodb database

const connectionMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Database Connected !");
  });
};
module.exports = connectionMongo;
