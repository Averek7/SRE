const express = require("express");
const cors = require("cors");
const connectionMongo = require("./configuration/connection"); //link to Database

var app = express();

//Configuring Port
app.set("port", 8000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connection
connectionMongo();

// Routes
app.use("/api/Aauth", require("./routes/AdminAuth"));
app.use("/api/Sauth", require("./routes/StudentAuth"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("api/questions", require("./routes/questionRoute"));

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

app.get("/", function (req, res) {
  res.send("WELCOME To SKYY RIDER ELECTRIC LEAD API'S");
});

// ROUTES
// var userroute = require("./routes/user_routes");
// var leadroute = require("./routes/lead_routes");

// var dbb = require("./configuration/collection");

// CHANGE PROD TO FALSE IF YOU WANT TO RUN THE
// APP ON THE LOCAL MACHINE
// var prod = true;
// var url = "mongodb://localhost:27017/nextstacks";

// if (prod) {
//   var prod_url = require("./configuration/connection");
//   url = prod_url;
// }

//Configuring Routes
// userroute.configure(app, mongo, ObjectID, url, assert, dbb);
// leadroute.configure(app, mongo, ObjectID, url, assert, dbb)
