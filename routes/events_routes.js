var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var events_module = require('../component/events_component')(mongo, ObjectID, url, assert, dbb);


        app.post('/add_event', function (req, res) {
            try {
                var new_event = {
                    // name: req.body.student_name,
                    image: req.body.image,
                };
                events_module.add_event(new_event, function (result, error, message) {
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

        app.post('/delete_event', function (req, res) {
            try {
                if (req.body.hasOwnProperty("event_id")) {
                    events_module.delete_event(req.body.event_id, function (result, error, message) {

                        res.json({ status: false, message: message });

                    })
                }
                else {
                    if (req.body.hasOwnProperty("event_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        app.post('/view_all_events', function (req, res) {
            try {

                events_module.view_all_events(function (result, error, message) {
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