// REQUIRE
var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectID = require('mongodb').ObjectID;

// //ROUTES
var studentroute = require('./routes/student_routes');
var batchroute = require('./routes/batch_routes');
var trainerroute = require('./routes/trainer_routes');


var dbb = require('./configuration/collection');

//Configuring Port
app.set('port', (process.env.PORT || 4000));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//     res.send("WELCOME TO TRAINING PORTAL API'S");
// });

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

//CHANGE PROD TO FALSE IF YOU WANT TO RUN THE
//APP ON THE LOCAL MACHINE
var prod = true;
// var url = "mongodb://localhost:27017/nextstacks";

if (prod) {
    var prod_url = require('./configuration/connection');
    url = prod_url;
}

//Configuring Routes
studentroute.configure(app, mongo, ObjectID, url, assert, dbb);
// adminroute.configure(app, mongo, ObjectID, url, assert, dbb);
// domainroute.configure(app, mongo, ObjectID, url, assert, dbb);
batchroute.configure(app, mongo, ObjectID, url, assert, dbb);
trainerroute.configure(app, mongo, ObjectID, url, assert, dbb);

// forumroute.configure(app, mongo, ObjectID, url, assert, dbb);
// questionroute.configure(app, mongo, ObjectID, url, assert, dbb);
// assessmentroute.configure(app, mongo, ObjectID, url, assert, dbb);
// lessonsroute.configure(app, mongo, ObjectID, url, assert, dbb);
// paymentroute.configure(app, mongo, ObjectID, url, assert, dbb);


app.get('/', function (req, res) {
    res.send("WELCOME TO Skyy Rider API'S");
});
