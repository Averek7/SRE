const mongoose = require("mongoose");
 const MONGO_URI = `mongodb+srv://mongo:mongopassword@technoboot-rmisn.mongodb.net/sreexam?retryWrites=true&w=majority`;
// const MONGO_URI = `mongodb://localhost:27017/skyriderexam?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;



module.exports = mongoose.connect(MONGO_URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`))

