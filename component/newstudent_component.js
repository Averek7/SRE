module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var students_module = {

        new_student: function (new_student, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.STUDENTS).insertOne(new_student, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Student Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        delete_student: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.STUDENTS).deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, true, "Student Removed Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        view_all_students: function (callBack) {
            try {
                students = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.STUDENTS).find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            students.push(doc);
                        }
                    }, function () {
                        if (students.length == 0) {
                            callBack(null, true, "No Students Found");
                        }
                        else {
                            callBack(students, false, "Students Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

    }
    return students_module;
}