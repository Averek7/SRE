var jwt = require('jsonwebtoken');


module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var attendance_module = require('../component/attendance_component')(mongo, ObjectID, url, assert, dbb);
        // var student_module = require('../component/student_component')(mongo, ObjectID, url, assert, dbb);
        // var admin_module = require('../../component/admin_module')(mongo, ObjectID, url, assert, dbb);
        app.post('/take_attendance', function (req, res) {
            try {
                if (req.body.hasOwnProperty("attendance") ) {
                    attendance_module.take_attendance(req.body.attendance, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: req.body.id });
                        }
                    })
                }
                else {
                    if (req.body.hasOwnProperty("attendance") == false) {
                        res.json({ status: false, message: "Attendance is missing" });
                    }


                }
            } catch (er) {
                console.log("error occured : " + err);
                res.json({ status: false, Message: "failed at try" });
            }
        });




    }
}