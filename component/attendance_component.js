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
    }
    return attendance_module;

}