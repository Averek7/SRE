module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var student_module = require('../component/newstudent_component')(mongo, ObjectID, url, assert, dbb);


        app.post('/add_student', function (req, res) {
            try {
                var new_student = {
                    name: req.body.student_name,
                    // image: req.body.image,
                };
                student_module.new_student(new_student, function (result, error, message) {
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
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

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
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

    }
}