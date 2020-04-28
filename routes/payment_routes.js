var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var payment_module = require('../component/payment_component')(mongo, ObjectID, url, assert, dbb);


        app.post('/view_student_payment', function (req, res) {
            try {
                if (req.body.hasOwnProperty("student_id")) {
                    payment_module.view_student_payment(req.body.student_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("student_id") == false) {
                        res.json({ status: false, message: "Student Id parameter is missing" });

                    }
                }

            }
            // else {
            //     if (req.body.hasOwnProperty("user_token") == false) {
            //         res.json({ status: false, Message: "user_token parameter missing" });
            //     }


            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });

        app.post('/add_payment', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id") && req.body.hasOwnProperty("amount") && req.body.hasOwnProperty("student_id") && req.body.hasOwnProperty("date")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        // payment_module.payment_exists(req.body.payment_name, function (result, exists, message) {
                        // if (exists) {
                        //     res.json({ status: false, message: message });
                        // }
                        // else {
                        var new_payment = {
                            batch_id: req.body.batch_id,
                            comment: req.body.comment,
                            amount: req.body.amount,
                            student_id: req.body.student_id,
                            date: req.body.date,
                        };
                        payment_module.add_payment(new_payment, function (result, error, message) {
                            if (error) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                res.json({ status: true, message: message, result: result.insertedId, user_token: user_token });
                            }
                        })
                        // }
                        // })
                    });
                }
                else {
                    if (req.body.hasOwnProperty("batch_id") == false) {
                        res.json({ status: false, message: "Batch_ Id parameter is Missing" });
                    }
                    else if (req.body.hasOwnProperty("amount") == false) {
                        res.json({ status: false, message: "Amount parameter is Missing" });
                    }
                    else if (req.body.hasOwnProperty("student_id") == false) {
                        res.json({ status: false, message: "Program Id parameter is Missing" });
                    }
                    else if (req.body.hasOwnProperty("date") == false) {
                        res.json({ status: false, message: "Date parameter Is Missing" });
                    }
                    else if (req.body.hasOwnProperty("date") == false) {
                        res.json({ status: false, message: "Date parameter Is Missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

    }
}