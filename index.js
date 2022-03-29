
var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectID = require('mongodb').ObjectID;

// //ROUTES
var userroute = require('./routes/user_routes');
var leadroute = require('./routes/lead_routes');

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
userroute.configure(app, mongo, ObjectID, url, assert, dbb);
leadroute.configure(app, mongo, ObjectID, url, assert, dbb);



app.get('/', function (req, res) {
    res.send("WELCOME To SKYY RIDER ELECTRIC LEAD API'S");
});
