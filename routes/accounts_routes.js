module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var account_component = require('../component/accounts_components')(mongo, ObjectID, url, assert, dbb);


         app.post('/add_account', function (req, res) {
            try {
                
                var new_account = {
                    // name: req.body.student_name,
                    user_id: user_id,
                     user_name: user_name,
                    company_name: company_name,
                    company_logo: company_logo,
                    contact_no: contact_no,

                };
                account_component.add_account(new_account, function (result, error, message) {
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
        
        
        app.post('/update_account', function (req, res) {
            try {
                if (req.body.hasOwnProperty("user_id") ) {
                    account_components.update_account(req.body.user_id, req.body.user_name, req.body.company_name, req.body.company_logo, req.body.contact_no, req.body.message, function (result, error, message) {
                            if (error) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                res.json({ status: true, message: message });
                            }
                        })
                }
                else {
                    if (req.body.hasOwnProperty("user_id") == false) {
                        res.json({ status: false, message: "user_id parameter is missing" });
                    }
                }
            }
            catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });
        app.post('/view_user_account', function (req, res) {
            try {
                if (req.body.hasOwnProperty("user_id")){
                    account_component.view_user_account(req.body.user_id,function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }
                    })
                }
                else{
                    res.json({status:false,message:"User_id Parameter is Missing"})
                }

               
            }
            catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });



        
    }
}