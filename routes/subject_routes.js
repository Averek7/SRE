var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var subject_module = require('../component/subject_component')(mongo, ObjectID, url, assert, dbb);
        app.post('/add_subject', function (req, res) {
            try {
                if (req.body.hasOwnProperty("subject_name") && req.body.hasOwnProperty("batch_id")) {
                    var user = {};
                    // jwt.sign({ user }, 'secretkey', (err, user_token) => {
                    subject_module.subject_exists(req.body.subject_name,req.body.batch_id, function (result, exists, message) {
                        if (exists) {
                            res.json({ status: false, message: message, user_token: result });
                        }
                        else {
                            var new_subject = {
                                subject_name: req.body.subject_name,
                                batch_id: req.body.batch_id,
                                attendance:[],
                                marks:[],
                            };
                            subject_module.add_subject(new_subject, function (result, error, message) {
                                if (error) {
                                    res.json({ status: false, message: message });
                                }
                                else {
                                    res.json({ status: true, message: message, result: result.insertedId, user_token: user_token });
                                }
                            })
                        }
                    })
                    // });
                }
                else {
                    if (req.body.hasOwnProperty("subject_name") == false) {
                        res.json({ status: false, message: "Subject name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("batch_id") == false) {
                        res.json({ status: false, message: "Batch Id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        //End of Add subject

        //API for Update subject
        //Params: id, name, email, contact_no, education, college_name, degree, branch, interested_area, additional_info, domains[], batches[], user_token, active
        //Functions: update_student
        //Response: status, message, result

        app.post('/update_subject', function (req, res) {
            try {
                if (req.body.hasOwnProperty("subject_id") && req.body.hasOwnProperty("subject_name") ) {
                    subject_module.update_subject(req.body.subject_id, req.body.subject_name, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("subject_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("subject_name") == false) {
                        res.json({ status: false, message: "subject name parameter is missing" });
                    }


                }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });
        app.post('/delete_subject', function (req, res) {
            try {
                if (req.body.hasOwnProperty("subject_id")) {
                    subject_module.delete_subject(req.body.subject_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.subject_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("subject_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        //End of Update Student


        //API for View All Student
        //Params: user_token
        //Functions: view_all_students
        //Response: status, message, result

        app.post('/view_batch_subjects', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id")) {
                    subject_module.view_batch_subject(req.body.batch_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("batch_id") == false) {
                        res.json({ status: false, message: "Batch id parameter is missing" });
                    }
                }
            }



            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });

    }
}