module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var user_component = require('../component/user_components')(mongo, ObjectID, url, assert, dbb);

        app.post('/login', function (req, res) {
            try {
                if (req.body.hasOwnProperty("password") && req.body.hasOwnProperty("email")) {
                    user_component.login(req.body.email, req.body.password, function (result, exists, message) {

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

        app.post('/add_user', function (req, res) {
            try {

                var new_account = {
                    // name: req.body.student_name,
                    user_name: req.body.user_name,
                    contact_no: req.body.contact_no,
                    email: req.body.email,
                    password:req.body.password,
                    type: 'E'

                };
                user_component.add_user(new_account, function (result, error, message) {
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



        // app.post('/update_account', function (req, res) {
        //     try {
        //         if (req.body.hasOwnProperty("user_id") ) {
        //             account_components.update_account(req.body.user_id, req.body.user_name, req.body.company_name, req.body.company_logo, req.body.contact_no, req.body.message, function (result, error, message) {
        //                     if (error) {
        //                         res.json({ status: false, message: message });
        //                     }
        //                     else {
        //                         res.json({ status: true, message: message });
        //                     }
        //                 })
        //         }
        //         else {
        //             if (req.body.hasOwnProperty("user_id") == false) {
        //                 res.json({ status: false, message: "user_id parameter is missing" });
        //             }
        //         }
        //     }
        //     catch (er) {
        //         console.log("error occured : " + er);
        //         res.json({ status: false, Message: "failed at try" });
        //     }
        // });

        app.post('/view_all_user', function (req, res) {
            try {
                // if (req.body.hasOwnProperty("user_id")){
                user_component.view_all_user(function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }
            catch (er) {
                console.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });




    }
}