const express = require("express");
const cors = require("cors");
const connectionMongo = require("./configuration/connection"); //link to Database
require("dotenv").config();

var app = express();

//Configuring Port
app.set("port", process.env.PORT);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connection


// Routes
app.use("/api/Aauth", require("./routes/AdminAuth"));
app.use("/api/Sauth", require("./routes/StudentAuth"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/question", require("./routes/questionRoute"));
app.use("/api/quiz/appear", require("./routes/AppearRoute"));
app.use("/api/quiz/question", require("./routes/AttemptRoute"));
//test
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

app.get("/", function (req, res) {
  res.send("WELCOME To SKYY RIDER ELECTRIC LEAD API'S");
});
