const { request } = require('express');

module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var account_component = require('../component/sender_components')(mongo, ObjectID, url, assert, dbb);
        app.post('/add_sender_id', function (req, res) {
            try {
                if (req.body.hasOwnProperty("user_id") && req.body.hasOwnProperty("sender_id") && req.body.hasOwnProperty("header_id")) {

                    var new_sender_account = {
                        // name: req.body.student_name,
                        user_id: request.body.user_id,
                        sender_id: request.body.sender_id,
                        header_id: request.body.header_id,
                        status: false,
                    }


                    new_sender_component.add_sender_account(new_sender_account, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message });
                        }
                    });
                }
                else {
                    if (req.body.hasOwnProperty("user_id") === false) {
                        res.json({ status: false, message: "User Id Missing" });
                    } else if (req.body.hasOwnProperty("sender_id") === false) {
                        res.json({ status: false, message: "Sender Id Missing" });
                    } else if (req.body.hasOwnProperty("header_id") === false) {
                        res.json({ status: false, message: "Header Id Missing" });
                    }
                }
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });

    }
}