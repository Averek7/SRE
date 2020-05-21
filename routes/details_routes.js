var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var details_module = require('../component/details_component')(mongo, ObjectID, url, assert, dbb);


        app.post('/login', function (req, res) {
            try {
                if (req.body.hasOwnProperty("password") && req.body.hasOwnProperty("email")) {
                    details_module.login(req.body.email, req.body.password, function (result, exists, message) {

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



        app.post('/add_details', function (req, res) {
            try {
                var new_details = {
                    // name: req.body.student_name,
                    email: req.body.email,
                    password: req.body.password,
                };
                details_module.add_details(new_details, function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });

        app.post('/update_details', function (req, res) {
            try {
                if (req.body.hasOwnProperty("id") ) {
                    details_module.update_details(req.body.id, req.body.address1, req.body.address2, req.body.address3, function (result, error, message) {
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
                    
                    // else if (req.body.hasOwnProperty("email") == false) {
                    //     res.json({ status: false, message: "email parameter is missing" });
                    // }
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

        app.post('/view_details', function (req, res) {
            try {

                details_module.view_details(function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }
            catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

    }
}