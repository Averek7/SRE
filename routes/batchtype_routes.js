var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var batchtype_module = require('../component/batchtype_component')(mongo, ObjectID, url, assert, dbb);
        app.post('/add_batchtype', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batchtype_name") && req.body.hasOwnProperty("duration")) {
                    var user = {};
                    // jwt.sign({ user }, 'secretkey', (err, user_token) => {
                        batchtype_module.batchtype_exists(req.body.batchtype_name, function (result, exists, message) {
                            if (exists) {
                                res.json({ status: false, message: message, user_token: result });
                            }
                            else {
                                var new_batchtype = {
                                    batchtype_name: req.body.batchtype_name,
                                    duration: req.body.duration,


                                };
                                batchtype_module.add_batchtype(new_batchtype, function (result, error, message) {
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
                    if (req.body.hasOwnProperty("batchtype_name") == false) {
                        res.json({ status: false, message: "Batchtype name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("duration") == false) {
                        res.json({ status: false, message: "duration parameter is missing" });
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

        //End of Add batchtype

        //API for Update batchtype
        //Params: id, name, email, contact_no, education, college_name, degree, branch, interested_area, additional_info, domains[], batches[], user_token, active
        //Functions: update_student
        //Response: status, message, result

        app.post('/update_batchtype', function (req, res) {
            try {
                if (req.body.hasOwnProperty("id") && req.body.hasOwnProperty("batchtype_name") && req.body.hasOwnProperty("duration")) {
                    batchtype_module.update_batchtype(req.body.id, req.body.batchtype_name, req.body.duration, function (result, error, message) {
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
                    else if (req.body.hasOwnProperty("batchtype_name") == false) {
                        res.json({ status: false, message: "Batchtype name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("duration") == false) {
                        res.json({ status: false, message: "duration parameter is missing" });
                    }

                }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });
        app.post('/delete_batch_type', function (req, res) {
            try {
                if (req.body.hasOwnProperty("batchtype_id")) {
                    batchtype_module.delete_batchtype(req.body.batchtype_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.batchtype_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("batchtype_id") == false) {
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

        app.post('/view_all_batchtype', function (req, res) {
            try {

                batchtype_module.view_all_batchtype(function (result, error, message) {
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