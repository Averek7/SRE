module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var details_module = {

        login: function (email, password, callBack) {
            try {
                exists = false;
                // user_token = false;
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.DETAILS).find({ "email": email });
                    cursor.forEach(function (doc, err) {
                        if (doc.password === password) {
                            value = doc;
                            exists = true;
                        }
                    }, function () {

                        if (exists) {
                            callBack(value, true, "Login Successful");
                        }
                        else {
                            callBack(exists, false, "Invalid Credential");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        add_details: function (new_details, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.DETAILS).insertOne(new_details, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Details Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        view_details: function (callBack) {
            try {
                details = '';
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.DETAILS).find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            details = doc;
                        }
                    }, function () {

                        callBack(details, false, "Details Found");

                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        update_details: function (id, address1, address2,address3, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.DETAILS).updateOne({ "_id": new ObjectID(id) }, {
                        $set: {
                            // email: email,
                            address1: address1,
                            address2: address2,
                            address3: address3
                        }
                    }, { upsert: false }, function (err, result) {
                        if (err) {
                            callBack(null, false, err);
                        } else {
                            callBack(result, true, "Updated Successfully");
                        }
                        db.close();
                    });
                });
            } catch (e) {
                callBack(null, true, e);
            }
        },

    }
    return details_module;
}