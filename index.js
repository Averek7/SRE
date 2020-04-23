
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
var courseroute = require('./routes/course_routes');
var programroute = require('./routes/program_routes');
var subjectroute = require('./routes/subject_routes');


var dbb = require('./configuration/collection');

//Configuring Port
app.set('port', (process.env.PORT || 8000));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
programroute.configure(app,mongo,ObjectID,url,assert,dbb);
courseroute.configure(app, mongo, ObjectID, url, assert, dbb);
studentroute.configure(app, mongo, ObjectID, url, assert, dbb);
batchroute.configure(app, mongo, ObjectID, url, assert, dbb);
trainerroute.configure(app, mongo, ObjectID, url, assert, dbb);
subjectroute.configure(app, mongo, ObjectID, url, assert, dbb);


app.get('/', function (req, res) {
    res.send("WELCOME TO Skyyrider API'S");
});
