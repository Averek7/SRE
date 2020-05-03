module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var mark_module = {



        add_marks: function (marks, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.MARK).insertMany(marks, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Marks Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        view_student_marks: function (student_id, subject_id, callBack) {
            try {
                marks = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.MARK).find({ "subject_id": subject_id, "student_id": student_id });
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            marks.push(doc);
                        }
                    }, function () {
                        if (marks.length == 0) {
                            callBack([], true, "User Found");
                            db.close();
                        }
                        else {
                                callBack(marks, false, "Marks Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


    }
    return mark_module;
}