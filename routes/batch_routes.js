var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var batch_module = require('../component/batch_component')(mongo, ObjectID, url, assert, dbb);
        // var admin_module = require('../../component/admin_module')(mongo, ObjectID, url, assert, dbb);

        // app.post('/login', function (req, res) {
        //     try {
        //         if (req.body.hasOwnProperty("batch_name") && req.body.hasOwnProperty("batch_type")) {
        //             batch_module.validate_uuid(req.body.device_uuid, req.body.email, function (exists, message, type) {
        //                 if (exists) {
        //                     batch_module.update_token(req.body.batch_name, req.body.batch_type, function (result, error, message) {
        //                         if (error) {
        //                             res.json({ status: false, message: message });
        //                         }
        //                         else {
        //                             res.json({ status: true, message: message, result: type });
        //                         }
        //                     })
        //                 }
        //                 else {
        //                     var new_student = {
        //                         batch_name: req.body.batch_name,
        //                         batch_type: req.body.batch_type,
        //                         // contact_no: '',
        //                         // education: '',
        //                         // college_name: '',
        //                         // degree: '',
        //                         // branch: '',
        //                         // interested_area: '',
        //                         // additional_info: '',
        //                         // user_token: req.body.user_token,
        //                         // device: [req.body.device],
        //                         // profile_img_url: req.body.profile_img_url,
        //                         // type: 'S',
        //                         // domains: [],
        //                         // batches: [],
        //                         // forums: [],
        //                         // get_notifications: true,
        //                         // active: true
        //                     }
        //                     student_module.add_batch(new_batch, function (result, error, message) {
        //                         if (error) {
        //                             res.json({ status: false, message: message });
        //                         }
        //                         else {
        //                             res.json({ status: true, message: message, result: req.body.user_token })
        //                         }
        //                     })
        //                 }
        //             })
        //         }
        //         else {
        //             if (req.body.hasOwnProperty("batch_name") == false) {
        //                 res.json({ status: false, message: "batch name parameter is missing" });
        //             } else if (req.body.hasOwnProperty("batch_type") == false) {
        //                 res.json({ status: false, message: "batch type parameter is missing" });
        //             }
        //             // else if (req.body.hasOwnProperty("user_token") == false) {
        //             //     res.json({ status: false, message: "user_token parameter is missing" });
        //             // }
        //             // else if (req.body.hasOwnProperty("device") == false) {
        //             //     res.json({ status: false, message: "device parameter is missing" });
        //             // }
        //             // else if (req.body.hasOwnProperty("profile_img_url") == false) {
        //             //     res.json({ status: false, message: "profile_img_url parameter is missing" });
        //             // }
        //         }
        //     } catch (er) {
        //         console.log("error occures: " + er);
        //         res.json({ status: false, message: "failed at try block...!" });
        //     }
        // });


        app.post('/add_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batch_name") && req.body.hasOwnProperty("batch_type")) {
                    var user = {};
                    jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        batch_module.batch_exists(req.body.batch_name, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: false, message: message, user_token: result });
                            }
                            else {
                                var new_batch = {
                                    batch_name: req.body.batch_name,
                                    batch_type: req.body.batch_type,
                                    // contact_no: req.body.contact_no,
                                    // education: req.body.education,
                                    // college_name: req.body.college_name,
                                    // degree: req.body.degree,
                                    // branch: req.body.branch,
                                    // interested_area: req.body.interested_area,
                                    // additional_info: req.body.additional_info,
                                    // uuid: [],
                                    // user_token: user_token,
                                    // type: 'S',
                                    // active: true
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
                    else if (req.body.hasOwnProperty("batch_type") == false) {
                        res.json({ status: false, message: "batch type parameter is missing" });
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

        //End of Add Student

        //API for Update Student
        //Params: id, name, email, contact_no, education, college_name, degree, branch, interested_area, additional_info, domains[], batches[], user_token, active
        //Functions: update_student
        //Response: status, message, result

        app.post('/update_batch', function (req, res) {
            try {
                if (req.body.hasOwnProperty("id") && req.body.hasOwnProperty("batch_name") && req.body.hasOwnProperty("batch_type")) {
                    batch_module.update_batch(req.body.id, req.body.batch_name, req.body.batch_type, function (result, error, message) {
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
                    else if (req.body.hasOwnProperty("batch_name") == false) {
                        res.json({ status: false, message: "batch name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("batch_type") == false) {
                        res.json({ status: false, message: "batch type parameter is missing" });
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

        //End of Update Student


        //API for View All Student
        //Params: user_token
        //Functions: view_all_students
        //Response: status, message, result

        app.post('/view_all_batch', function (req, res) {
            try {

                batch_module.view_all_batch(function (result, error, message) {
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