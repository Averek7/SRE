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


    }
    return mark_module;
}