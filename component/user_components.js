module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var user_component = {

        login: function (email, password, callBack) {
            try {
                exists = false;
                // user_token = false;
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.USER).find({ "email": email });
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


        add_user: function (new_account, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.USER).insertOne(new_account, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Account Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },



        view_all_user: function (callBack) {
            try {
                user = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.USER).find({ 'type': 'E' });
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            user.push(doc);
                        }
                    }, function () {
                        if (user.length === 0) {
                            callBack('', true, "No Account Found");
                        } else {
                            callBack(user, false, "Account Found");
                        }

                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },
    }
    return user_component;
}