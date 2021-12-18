// const template_components = require('../component/template_components');

module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var template_components = require('../component/template_components')(mongo, ObjectID, url, assert, dbb);


        app.post('/add_template', function (req, res) {
            try {
                
                var new_template = {
                    // name: req.body.student_name,
                    dlt_template_id:req.body.dlt_template_id,
                    user_id: req.body.user_id,
                    title:req.body.title,
                    message:req.body.message,

                };
                template_components.add_template(new_template, function (result, error, message) {
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
        
        app.post('/update_template', function (req, res) {
            try {
                if (req.body.hasOwnProperty("template_id") ) {
                    template_components.update_template(req.body.template_id, req.body.dlt_template_id, req.body.user_id, req.body.title, req.body.message, function (result, error, message) {
                            if (error) {
                                res.json({ status: false, message: message });
                            }
                            else {
                                res.json({ status: true, message: message });
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
        app.post('/view_user_template', function (req, res) {
            try {
                if (req.body.hasOwnProperty("user_id")){
                    template_components.view_user_template(req.body.user_id,function (result, error, message) {
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

       app.post('/delete_template', function (req, res) {
            try {
                if (req.body.hasOwnProperty("template_id")) {
                    template_components.delete_template(req.body.template_id, function (result, error, message) {
                        if(error){
                        res.json({ status: false, message: message });
                    } else{
                        res.json({ status: true, message: message });

                    }

                    })
                }
                else {
                    if (req.body.hasOwnProperty("event_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        }); 
    }
}