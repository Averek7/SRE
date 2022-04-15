var jwt = require('jsonwebtoken');
var moment = require('moment');

module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var lead_component = require('../component/lead_component')(mongo, ObjectID, url, assert, dbb);

        app.post('/add_lottery', function (req, res) {
            try {
                var new_details = {
                    time: req.body.time,
                    date: req.body.date,
                    A: req.body.A,
                    B: req.body.B,
                    C: req.body.C
                };
                lead_component.add_lead(new_details, function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });

        

        app.post('/view_user_lead', function (req, res) {
            try {
                lead_component.view_user_lead(req.body.user_id,function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }
            catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

        app.post('/view_date_lottery', function (req, res) {
            try {
                lead_component.view_today_user_lead(req.body.date,function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }
            catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

    }
}