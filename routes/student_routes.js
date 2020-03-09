var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var student_module = require('../component/student_component')(mongo, ObjectID, url, assert, dbb);
        var batch_module = require('../component/batch_component')(mongo, ObjectID, url, assert, dbb);

        // var admin_module = require('../../component/admin_module')(mongo, ObjectID, url, assert, dbb);

        app.post('/login_email', function (req, res) {
            try {
                if (req.body.hasOwnProperty("password") && req.body.hasOwnProperty("email")) {
                    student_module.student_login(req.body.password, req.body.email, function (result, exists, message) {

                        if (exists) {
                            res.json({ status: true, message: message, result: result });
                        }
                        else {
                            res.json({ status: false, message: message });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "email parameter is missing" });
                    } else if (req.body.hasOwnProperty("password") == false) {
                        res.json({ status: false, message: "Enter Your Password" });
                    }
                }
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });


        app.post('/login_social', function (req, res) {
            try {
                if (req.body.hasOwnProperty("email")) {
                    student_module.student_social(req.body.email, function (result, exists, message) {
                        if (exists) {
                            res.json({ status: true, message: message, result: result });
                        }
                        else {
                            student_module.add_student({ email: req.body.email, password: "Pass1234", type: "S", profilepic: req.body.profilepic }, function (result, status, msg) {
                                if (status) {
                                    res.json({ status: true, message: message, result: result });
                                }
                                else {
                                    res.json({ status: flase, message: message });
                                }
                            })
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "email parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });


        app.post('/add_student', function (req, res) {
            try {
                if (req.body.hasOwnProperty("student_name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("student_age") && req.body.hasOwnProperty("institute_name") && req.body.hasOwnProperty("education") &&
                    req.body.hasOwnProperty("phone_no") && req.body.hasOwnProperty("batch") && req.body.hasOwnProperty("advance_amount") && req.body.hasOwnProperty("batch_type") && req.body.hasOwnProperty("father_name") && req.body.hasOwnProperty("roll_no") && req.body.hasOwnProperty("father_occupation")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        student_module.student_exists(req.body.email, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: true, message: message, user_token: result });
                            }
                            else {
                                var new_student = {
                                    student_name: req.body.student_name,
                                    student_image:req.body.student_image,
                                    email: req.body.email,
                                    student_age: req.body.student_age,
                                    institute_name: req.body.institute_name,
                                    education: req.body.education,
                                    phone_no: req.body.phone_no,
                                    batch: [{batch:req.body.batch,batch_type:req.body.batch_type}],
                                    amount:[{comment:"Advance",amount:req.body.advance_amount}],
                                    father_name: req.body.father_name,
                                    roll_no: req.body.roll_no,
                                    father_occupation: req.body.father_occupation,
                                    user_token: user_token,
                                    password: 'Pass1234',
                                    type: 'S',
                                    active: true
                                };
                                student_module.add_student(new_student, function (result, error, message) {
                                    if (error) {
                                        res.json({ status: false, message: message });
                                    }
                                    else {
                                        res.json({ status: true, message: message, result: result.insertedId, user_token: user_token });
                                    }
                                })
                            }
                        })
                    });
                }
                else {
                    if (req.body.hasOwnProperty("name") == false) {
                        res.json({ status: false, message: "name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "email parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("contact_no") == false) {
                        res.json({ status: false, message: "contact_no parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("education") == false) {
                        res.json({ status: false, message: "education parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("college_name") == false) {
                        res.json({ status: false, message: "college_name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("degree") == false) {
                        res.json({ status: false, message: "degree parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("branch") == false) {
                        res.json({ status: false, message: "branch parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("interested_area") == false) {
                        res.json({ status: false, message: "interested_area parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("additional_info") == false) {
                        res.json({ status: false, message: "additional_info parameter is missing" });
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

        app.post('/update_student', function (req, res) {
            try {
                if (req.body.hasOwnProperty("id") && req.body.hasOwnProperty("name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("contact_no") &&
                    req.body.hasOwnProperty("education") && req.body.hasOwnProperty("college_name") && req.body.hasOwnProperty("degree") &&
                    req.body.hasOwnProperty("branch") && req.body.hasOwnProperty("interested_area") && req.body.hasOwnProperty("additional_info")) {
                    student_module.update_student(req.body.id, req.body.name, req.body.email, req.body.contact_no, req.body.education, req.body.college_name,
                        req.body.degree, req.body.branch, req.body.interested_area, req.body.additional_info, function (result, error, message) {
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
                    else if (req.body.hasOwnProperty("name") == false) {
                        res.json({ status: false, message: "name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "email parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("contact_no") == false) {
                        res.json({ status: false, message: "contact_no parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("education") == false) {
                        res.json({ status: false, message: "education parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("college_name") == false) {
                        res.json({ status: false, message: "college_name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("degree") == false) {
                        res.json({ status: false, message: "degree parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("branch") == false) {
                        res.json({ status: false, message: "branch parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("interested_area") == false) {
                        res.json({ status: false, message: "interested_area parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("additional_info") == false) {
                        res.json({ status: false, message: "additional_info parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        app.post('/delete_student', function (req, res) {
            try {
                if (req.body.hasOwnProperty("student_id")) {
                    student_module.delete_student(req.body.student_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.student_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("id") == false) {
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


        app.post('/view_batch_students', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id")) {
                    student_module.view_batch_student(req.body.batch_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                }
                else {

                }
            }
            catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

        // app.post('/take_attendance',function(req,res){
        //     try{
        //         if(req.body.)
        //     }
        // })

        //End of Update Student


        //API for View All Student
        //Params: user_token
        //Functions: view_all_students
        //Response: status, message, result

        app.post('/view_all_students', function (req, res) {
            try {
                student_module.view_all_students(function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }



            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });

    }
}