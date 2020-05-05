var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var trainer_module = require('../component/trainer_component')(mongo, ObjectID, url, assert, dbb);
        app.post('/add_trainer', function (req, res) {
            try {
                if (req.body.hasOwnProperty("trainer_name") && req.body.hasOwnProperty("trainer_qualification") && req.body.hasOwnProperty("trainer_specialization") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("contact_no")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        trainer_module.trainer_exists(req.body.trainer_name, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: true, message: message, user_token: result });
                            }
                            else {
                                var new_trainer = {
                                    name: req.body.trainer_name,
                                    trainer_dob: req.body.dob,
                                    trainer_qualification: req.body.trainer_qualification,
                                    trainer_specialization: req.body.trainer_specialization,
                                    email: req.body.email,
                                    trainer_designation: req.body.trainer_designation,
                                    trainer_employee_code: req.body.trainer_employee_code,
                                    trainer_bloodgroup: req.body.trainer_bloodgroup,
                                    trainer_reporting_authority: req.body.trainer_reporting_authority,
                                    contact_no: req.body.contact_no,
                                    password:'Pass1234',
                                    profilepic:"",
                                    type: 'T',
                                    token:''
                                    // active: true
                                };
                                trainer_module.add_trainer(new_trainer, function (result, error, message) {
                                    if (error) {
                                        res.json({ status: false, message: message });
                                    }
                                    else {
                                        res.json({ status: true, message: message });
                                    }
                                })
                            }
                        })
                    });
                }
                else {
                    if (req.body.hasOwnProperty("trainer_name") == false) {
                        res.json({ status: false, message: "Trainer Name Parameter Is Missing" });
                    }
                    else if (req.body.hasOwnProperty("trainer_age") == false) {
                        res.json({ status: false, message: "Trainer Name Parameter Is Missing" });
                    }
                    else if (req.body.hasOwnProperty("trainer_qualification") == false) {
                        res.json({ status: false, message: "Trainer Qualification Parameter Is Missing" });
                    }
                    else if (req.body.hasOwnProperty("trainer_specialization") == false) {
                        res.json({ status: false, message: "Trainer Specialization Parameter Is Missing" });
                    }
                    else if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "Trainer Email Parameter Is Missing" });
                    }
                    else if (req.body.hasOwnProperty("phone_no") == false) {
                        res.json({ status: false, message: "Trainer Phone Number Parameter Is Missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });
        app.post('/delete_trainer', function (req, res) {
            try {
                if (req.body.hasOwnProperty("trainer_id")) {
                    trainer_module.delete_trainer(req.body.trainer_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.student_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("trainer_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("user_token") == false) {
                        res.json({ status: false, message: "user_token parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        //End of Add Student

        //API for Update Student
        //Params: id, name, email, contact_no, education, college_name, degree, branch, interested_area, additional_info, domains[], batches[], user_token, active
        //Functions: update_student
        //Response: status, message, result

        app.post('/update_trainer', function (req, res) {
            try {
                if (req.body.hasOwnProperty("trainer_id") && req.body.hasOwnProperty("trainer_name") ) {
                    trainer_module.update_trainer(req.body.trainer_id, req.body.trainer_name,req.body.dob, req.body.trainer_qualification, req.body.trainer_specialization, req.body.contact_no, req.body.trainer_designation, req.body.trainer_employee_code, req.body.trainer_bloodgroup, req.body.trainer_reporting_authority, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("trainer_expertise") == false) {
                        res.json({ status: false, message: "trainer name parameter is missing" });
                    }
                    // else if (req.body.hasOwnProperty("password") == false) {
                    //     res.json({ status: false, message: "batch type parameter is missing" });
                    // }
                    else if (req.body.hasOwnProperty("contact_no") == false) {
                        res.json({ status: false, message: "contact_no parameter is missing" });
                    }
                    // else if (req.body.hasOwnProperty("education") == false) {
                    //     res.json({ status: false, message: "education parameter is missing" });
                    // }
                    // else if (req.body.hasOwnProperty("college_name") == false) {
                    //     res.json({ status: false, message: "college_name parameter is missing" });
                    // }
                    // else if (req.body.hasOwnProperty("degree") == false) {
                    //     res.json({ status: false, message: "degree parameter is missing" });
                    // }
                    // else if (req.body.hasOwnProperty("branch") == false) {
                    //     res.json({ status: false, message: "branch parameter is missing" });
                    // }
                    // else if (req.body.hasOwnProperty("interested_area") == false) {
                    //     res.json({ status: false, message: "interested_area parameter is missing" });
                    // }
                    // else if (req.body.hasOwnProperty("additional_info") == false) {
                    //     res.json({ status: false, message: "additional_info parameter is missing" });
                    // }
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

        app.post('/view_all_trainer', function (req, res) {
            try {
                trainer_module.view_all_trainer(function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
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

    }
}