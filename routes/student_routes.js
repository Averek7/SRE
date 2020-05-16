var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var student_module = require('../component/student_component')(mongo, ObjectID, url, assert, dbb);
        var batch_module = require('../component/batch_component')(mongo, ObjectID, url, assert, dbb);
        var payment_module = require('../component/payment_component')(mongo, ObjectID, url, assert, dbb);
        var subject_module = require('../component/subject_component')(mongo, ObjectID, url, assert, dbb);
        var attendance_module = require('../component/attendance_component')(mongo, ObjectID, url, assert, dbb);
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
                            student_module.add_student({ email: req.body.email, password: "Pass1234", type: "S", profilepic: req.body.profilepic }, function (result, error, message) {
                                if (error) {
                                    res.json({ status: false, message: message });
                                }
                                else {
                                    res.json({ status: true, message: message, result: result });
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
                if (req.body.hasOwnProperty("student_name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("student_dob") && req.body.hasOwnProperty("institute_name") && req.body.hasOwnProperty("education") &&
                    req.body.hasOwnProperty("phone_no") && req.body.hasOwnProperty("batch_id") && req.body.hasOwnProperty("father_name") && req.body.hasOwnProperty("roll_no") && req.body.hasOwnProperty("father_contact_no")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        student_module.student_exists(req.body.email, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: true, message: message, user_token: result });
                            }
                            else {
                                var new_student = {
                                    name: req.body.student_name,
                                    email: req.body.email,
                                    dob: req.body.student_dob,
                                    blood_group: req.body.blood_group,
                                    institute_name: req.body.institute_name,
                                    education: req.body.education,
                                    contact_no: req.body.phone_no,
                                    batch: [{ batch_id: req.body.batch_id, hostel_amount: req.body.hostel_amount, roll_no: req.body.roll_no }],
                                    father_name: req.body.father_name,
                                    hometown: req.body.hometown,
                                    father_contact_no: req.body.father_contact_no,
                                    user_token: user_token,
                                    password: 'Pass1234',
                                    type: 'S',
                                    profilepic:" ",
                                    institution_id: "5ebdb92948b22d6965c55aeb",
                                    active: true
                                };
                                student_module.add_student(new_student, function (result, error, message) {
                                    if (error) {
                                        res.json({ status: false, message: message });
                                    }
                                    else {
                                        res.json({ status: true, message: message, result: result });
                                    }
                                })
                            }
                        })
                    });
                }
                else {
                    if (req.body.hasOwnProperty("student_name") == false) {
                        res.json({ status: false, message: "name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "email parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("phone_no") == false) {
                        res.json({ status: false, message: "contact_no parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("education") == false) {
                        res.json({ status: false, message: "education parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("institute_name") == false) {
                        res.json({ status: false, message: "college_name parameter is missing" });
                    }
                    
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });




        app.post('/signup', function (req, res) {
            try {
                if (req.body.hasOwnProperty("student_name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("student_dob") && req.body.hasOwnProperty("institute_name") && req.body.hasOwnProperty("education") &&
                    req.body.hasOwnProperty("phone_no") && req.body.hasOwnProperty("father_name") && req.body.hasOwnProperty("father_occupation")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        student_module.student_exists(req.body.email, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: true, message: message, user_token: result });
                            }
                            else {
                                var new_student = {
                                    name: req.body.student_name,
                                    email: req.body.email,
                                    dob: req.body.student_dob,
                                    blood_group: req.body.blood_group,
                                    institute_name: req.body.institute_name,
                                    education: req.body.education,
                                    contact_no: req.body.phone_no,
                                    // batch: [{ batch_id: req.body.batch_id, hostel_amount: req.body.hostel_amount, roll_no: req.body.roll_no }],
                                    father_name: req.body.father_name,
                                    hometown: req.body.hometown,
                                    father_contact_no: req.body.father_contact_no,
                                    user_token: user_token,
                                    password: req.body.password,
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
                    if (req.body.hasOwnProperty("student_name") == false) {
                        res.json({ status: false, message: "name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("email") == false) {
                        res.json({ status: false, message: "email parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("phone_no") == false) {
                        res.json({ status: false, message: "contact_no parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("education") == false) {
                        res.json({ status: false, message: "education parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("institute_name") == false) {
                        res.json({ status: false, message: "college_name parameter is missing" });
                    }
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

                        res.json({ status: false, message: message });

                    })
                }
                else {
                    if (req.body.hasOwnProperty("student_id") == false) {
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
                    if (req.body.hasOwnProperty("batch_id") === false) {
                        res.json({ status: false, message: "Batch Id Parameter is missing" });
                    }
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
        app.post('/search_student', function (req, res) {
            try {
                student_module.search_students(req.body.keyword, function (result, error, message) {
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
        })
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


        app.post('/view_profile', function (req, res) {
            try {
                student_module.view_profile(req.body.user_id, function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message, result });
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




        app.post('/view_student_batches', function (req, res) {
            try {
                student_module.get_batch(req.body.user_id, function (batches, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        batch_module.view_student_batch_detail(batches, function (result, err, message) {
                            if (err) {
                                res.json({ status: false, message: message, result });
                            }
                            else {
                                res.json({ status: true, message: message, result: result });
                            }
                        })
                    }
                })
            }
            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });




        app.post('/view_student_payments', function (req, res) {
            try {
                batch_module.get_batch_price(req.body.batch_id, function (price, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        student_module.get_hostel_fees(req.body.batch_id, req.body.user_id, function (hostel, err, message) {
                            if (err) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                payment_module.view_student_payments(req.body.batch_id, req.body.user_id, function (payments, er, message) {
                                    if (er) {
                                        res.json({ status: false, message: message, result: { batch_price: price, hostel_fee: hostel, payments: [] } });
                                    }
                                    else {
                                        res.json({ status: true, message: message, result: { batch_price: price, hostel_fee: hostel, payments: payments } })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });



        app.post('/view_student_attendance', function (req, res) {
            try {
                var i = 0;
                var subject = [];
                var data;
                var total_c = 0;
                var total_p = 0;
                attendance_module.count_batch_class(req.body.batch_id, req.body.user_id, function (total_class, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        attendance_module.count_student_present(req.body.batch_id, req.body.user_id, function (total_presents, err, message) {

                            if (err) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                subject_module.view_batch_attendances(req.body.batch_id, req.body.user_id, function (subjects, er, message) {

                                    if (er) {
                                        res.json({ status: false, message: message });
                                    }
                                    else {
                                        res.json({ status: true, message: message, result: { total_class: total_class, total_present: total_presents, subjects: subjects } });
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });


        app.post('/view_student_batches_details', function (req, res) {
            try {
                student_module.get_batch(req.body.user_id, function (batch_id, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        batch_module.view_student_batch_details(batch_id, function (result, err, message) {
                            if (err) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                // res.json({ status: true, message: message, result: result });
                                subject_module.view_batch_subject(batch_id,function (subject,er,message) {
                                    if(er){
                                        res.json({status:true,message:message,result:{"batch_details":result,subject:[]}})
                                    }
                                    else{
                                        res.json({ status: true, message: message, result: { batch_details: result, subject: subject} });
                                    }
                                })
                            }
                        })
                    }
                })
            }
            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: er });
            }
        });

        app.post('/change_password', function (req, res) {
            try {
                if (req.body.hasOwnProperty("user_id") && req.body.hasOwnProperty("old_password") && req.body.hasOwnProperty("new_password") && req.body.hasOwnProperty("confirm_password")) {
                    if (req.body.old_password !== req.body.new_password) {
                        if (req.body.new_password == req.body.confirm_password) {
                            student_module.change_password(req.body.user_id, req.body.old_password, req.body.new_password, function (error, message) {
                                res.json({ status: !(error), message: message });
                            })
                        }
                        else {
                            res.json({ status: false, message: "New and Conirm password are different" });
                        }
                    }
                    else {
                        res.json({ status: false, message: "New Password cannot be same as old" });
                    }
                }
                else {
                    if (req.body.hasOwnProperty("user_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("old_password") == false) {
                        res.json({ status: false, message: "Old Password parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("new_password") == false) {
                        res.json({ status: false, message: "New Password parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("confirm_password") == false) {
                        res.json({ status: false, message: "Confirm Password parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

    }
}