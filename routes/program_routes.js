var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var program_module = require('../component/program_components')(mongo, ObjectID, url, assert, dbb);
        app.post('/add_program', function (req, res) {
            try {
                if (req.body.hasOwnProperty("program_name") ) {
                    var user = {};
                    // jwt.sign({ user }, 'secretkey', (err, user_token) => {
                    program_module.program_exists(req.body.program_name, function (result, exists, message) {
                        if (exists) {
                            res.json({ status: false, message: message, user_token: result });
                        }
                        else {
                            var new_program = {
                                program_name: req.body.program_name,
                            };
                            program_module.add_program(new_program, function (result, error, message) {
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
                    if (req.body.hasOwnProperty("program_name") == false) {
                        res.json({ status: false, message: "program name parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        //End of Add program

        //API for Update program
        //Params: id, name, email, contact_no, education, college_name, degree, branch, interested_area, additional_info, domains[], batches[], user_token, active
        //Functions: update_student
        //Response: status, message, result

        app.post('/update_program', function (req, res) {
            try {
                if (req.body.hasOwnProperty("program_id") && req.body.hasOwnProperty("program_name") ) {
                    program_module.update_program(req.body.program_id, req.body.program_name,  function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("program_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                    else if (req.body.hasOwnProperty("program_name") == false) {
                        res.json({ status: false, message: "program name parameter is missing" });
                    }
                    

                }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });
        app.post('/delete_program', function (req, res) {
            try {
                if (req.body.hasOwnProperty("program_id")) {
                    program_module.delete_program(req.body.program_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.program_id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("program_id") == false) {
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

        app.post('/view_all_programs', function (req, res) {
            try {

                program_module.view_all_program(function (result, error, message) {
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