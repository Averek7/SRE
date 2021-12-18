module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var template_components = {
        add_template: function (new_template, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.TEMPLATE).insertOne(new_template, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Template Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        update_template: function (template_id,dlt_template_id, user_id, title,message, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.TEMPLATE).updateOne({ "_id": new ObjectID(template_id) }, {
                        $set: {
                            // email: email,
                            dlt_template_id: dlt_template_id,
                            user_id: user_id,
                            title: title,
                            message: message,
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


        view_user_template: function (user_id,callBack) {
            try {
                template = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.TEMPLATE).find({user_id:user_id});
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            template.push(doc);
                        }
                    }, function () {

                        callBack(template, false, "Template Found");

                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },
        delete_template: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.TEMPLATE).deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Template Deleted Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },
    }
    return template_components;
}