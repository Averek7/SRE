module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var attendance_module = {
        take_attendance: function (attendance, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.ATTENDANCE).insertMany(attendance, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Attendance Taken Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        count_subject_class: function (subject_id, student_id, callBack) {
            try {
                // students = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.ATTENDANCE).countDocuments({ "subject_id": subject_id, "student_id": student_id }, function (doc, err) {
                        // if (err) {
                        console.log(err);
                        callBack(err, false, "caculated");
                        // }
                        // else {
                        //     callBack(doc);
                        // }
                        db.close();
                    });

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        count_student_present_subject: function (subject_id, student_id, callBack) {
            try {
                // students = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.ATTENDANCE).find({ "subject_id": subject_id, "student_id": student_id, "present": true }).count(function (doc, err) {
                        // if (err) {
                        callBack(err);
                        // }
                        // else {
                        //     callBack(doc);
                        // }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        count_batch_class: function (batch_id, student_id, callBack) {
            try {
                // students = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.ATTENDANCE).find({ "batch_id": batch_id, "student_id": student_id });
                    cursor.count(function (doc, err) {
                        // if (err) {
                        callBack(err);
                        // }
                        // else {
                        //     callBack(doc);
                        // }
                        db.close();
                    })
                    // callBack(cursor)
                    db.close();
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        count_student_present: function (batch_id, student_id, callBack) {
            try {
                // students = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.ATTENDANCE).find({ "batch_id": batch_id, "student_id": student_id, "present": true });
                    cursor.count(function (doc, err) {
                        // if (err) {
                        callBack(err, false, "caculated");
                        // }
                        // else {
                        //     callBack(doc);
                        // }
                        db.close();
                    })
                    // callBack(cursor)
                    db.close();
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        view_student_attendance: function (subject_id, student_id, callBack) {
            try {
                attendance = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.ATTENDANCE).find({ "subject_id": subject_id, "student_id": student_id });
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            attendance.push(doc);
                        }
                    }, function () {

                        if (attendance.length == 0) {
                            callBack([], false, "User Found");
                            db.close();
                        }
                        else {
                            callBack(attendance, true, "No Batch Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


    }
    return attendance_module;

}