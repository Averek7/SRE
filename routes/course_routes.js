var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var course_module = require('../component/course_component')(mongo, ObjectID, url, assert, dbb);
        app.post('/add_course', function (req, res) {
            try {
                if (req.body.hasOwnProperty("course_name") && req.body.hasOwnProperty("program_id") && req.body.hasOwnProperty("course_duration")) {
                    var user = {};
                    // jwt.sign({ user }, 'secretkey', (err, user_token) => {
                    course_module.course_exists(req.body.course_name, function (result, exists, message) {
                        if (exists) {
                            res.json({ status: false, message: message, user_token: result });
                        }
                        else {
                            var new_course = {
                                course_name: req.body.course_name,
                                program_id: req.body.program_id,
                                course_duration: req.body.course_duration,
                            };
                            course_module.add_course(new_course, function (result, error, message) {
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
                    if (req.body.hasOwnProperty("course_name") == false) {
                        res.json({ status: false, message: "course name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("course_duration") == false) {
                        res.json({ status: false, message: "course Duration parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("program_id") == false) {
                        res.json({ status: false, message: "Program Id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        //End of Add course

        //API for Update course
        //Params: id, name, email, contact_no, education, college_name, degree, branch, interested_area, additional_info, domains[], batches[], user_token, active
        //Functions: update_student
        //Response: status, message, result

        app.post('/update_course', function (req, res) {
            try {
                if (req.body.hasOwnProperty("course_id") && req.body.hasOwnProperty("course_name") && req.body.hasOwnProperty("course_duration")) {
                    course_module.update_course(req.body.course_id, req.body.course_name, req.body.course_duration, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("course_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("course_name") == false) {
                        res.json({ status: false, message: "course name parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("course_duration") == false) {
                        res.json({ status: false, message: "course Duration parameter is missing" });
                    }


                }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });
        app.post('/delete_course', function (req, res) {
            try {
                if (req.body.hasOwnProperty("course_id")) {
                    course_module.delete_course(req.body.course_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.course_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("course_id") == false) {
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

        app.post('/view_all_courses', function (req, res) {
            try {
                if (req.body.hasOwnProperty("program_id")) {
                    course_module.view_all_course(req.body.program_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("program_id") == false) {
                        res.json({ status: false, message: "Program id parameter is missing" });
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