var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var mark_module = require('../component/mark_component')(mongo, ObjectID, url, assert, dbb);



        app.post('/add_marks', function (req, res) {
            try {
                if (req.body.hasOwnProperty("marks")) {
                    mark_module.add_marks(req.body.marks, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("marks") == false) {
                        res.json({ status: false, message: "marks is missing" });
                    }

                }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });


        app.post('/view_student_marks', function (req, res) {
            try {
                // if (req.body.hasOwnProperty("marks")) {
                mark_module.view_student_marks(req.body.user_id, req.body.subject_id, function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
                // }
                // else {
                //     if (req.body.hasOwnProperty("marks") == false) {
                //         res.json({ status: false, message: "marks is missing" });
                //     }

                // }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });
    }
}
