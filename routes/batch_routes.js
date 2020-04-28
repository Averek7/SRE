var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var batch_module = require('../component/batch_component')(mongo, ObjectID, url, assert, dbb);
        var student_module = require('../component/student_component')(mongo, ObjectID, url, assert, dbb);
        // var admin_module = require('../../component/admin_module')(mongo, ObjectID, url, assert, dbb);


        app.post('/delete_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id")) {
                    batch_module.delete_batch(req.body.batch_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.batch_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("batch_id") == false) {
                        res.json({ status: false, message: "batch_id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });



        app.post('/add_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_name") && req.body.hasOwnProperty("course_id") && req.body.hasOwnProperty("batch_price") && req.body.hasOwnProperty("program_id")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        batch_module.batch_exists(req.body.batch_name, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                var new_batch = {
                                    batch_name: req.body.batch_name,
                                    course_id: req.body.course_id,
                                    batch_price: req.body.batch_price,
                                    program_id: req.body.program_id,
                                    batch_start_date: req.body.batch_start_date,
                                    // subjects:[],
                                    // students:[],
                                    // batch_strength:0,
                                    // total_price:0,
                                    // collected_price:0,
                                    active: true,
                                };
                                batch_module.add_batch(new_batch, function (result, error, message) {
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
                    if (req.body.hasOwnProperty("batch_name") == false) {
                        res.json({ status: false, message: "batch name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("course_id") == false) {
                        res.json({ status: false, message: "Course Id parameter is Missing" });
                    }
                    else if (req.body.hasOwnProperty("batch_price") == false) {
                        res.json({ status: false, message: "batch price parameter is Missing" });
                    }
                    else if (req.body.hasOwnProperty("program_id") == false) {
                        res.json({ status: false, message: "Program Id parameter is Missing" });
                    }
                    else if (req.body.hasOwnProperty("batch_start_date") == false) {
                        res.json({ status: false, message: "Batch Start Date parameter Is Missing" });
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

        app.post('/update_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id") && req.body.hasOwnProperty("batch_name") && req.body.hasOwnProperty("batch_price") && req.body.hasOwnProperty("batch_start_date")) {
                    batch_module.update_batch(req.body.batch_id, req.body.batch_name, req.body.batch_price, req.body.batch_start_date, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("batch_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("batch_name") == false) {
                        res.json({ status: false, message: "batch name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("course_id") == false) {
                        res.json({ status: false, message: "Course Id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("program_id") == false) {
                        res.json({ status: false, message: "Program Id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("batch_start_date") == false) {
                        res.json({ status: false, message: "Batch Start Date parameter is missing" });
                    }
                    // else if (req.body.hasOwnProperty("contact_no") == false) {
                    //     res.json({ status: false, message: "contact_no parameter is missing" });
                    // }
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


        app.post('/end_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id") && req.body.hasOwnProperty("batch_end_date") && req.body.hasOwnProperty("user_id") && req.body.hasOwnProperty("user_name")) {
                    batch_module.end_batch(req.body.batch_id, req.body.batch_end_date, req.body.user_id, req.body.user_name, function (result, error, message) {
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
                    else if (req.body.hasOwnProperty("batch_end_date") == false) {
                        res.json({ status: false, message: "Batch End Date parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("user_id") == false) {
                        res.json({ status: false, message: "User Id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("user_name") == false) {
                        res.json({ status: false, message: "User Name parameter is missing" });
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

        app.post('/view_all_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("course_id")) {
                    batch_module.view_all_batch(req.body.course_id,function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("course_id") == false) {
                        res.json({ status: false, message: "Course Id parameter is missing" });

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

        app.post('/view_active_batch', function (req, res) {
            try {
                // if (req.body.hasOwnProperty("course_id")) {
                    batch_module.view_active_batch(function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                // }
                // else {
                //     if (req.body.hasOwnProperty("course_id") == false) {
                //         res.json({ status: false, message: "Course Id parameter is missing" });

                //     }
                // }

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

        app.post('/view_batch_details', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_id")) {
                    batch_module.view_batch_details(req.body.batch_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            student_module.count_batch_strength(req.body.batch_id,function(strength){
                                result.batch_strength=strength;
                                res.json({ status: true, message: message, result: result });

                            })
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("batch_id") == false) {
                        res.json({ status: false, message: "Batch Id parameter is missing" });

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