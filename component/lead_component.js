module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var lead_component = {

        add_lead: function (new_details, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.LEAD).insertOne(new_details, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Lead Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        view_user_lead: function (user_id, callBack) {
            try {
                lead = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.LEAD).find({ 'user_id': user_id });
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            lead.push(doc);
                        }
                    }, function () {
                        if (lead.length === 0) {
                            callBack('', true, "No Lead Found");

                        } else {
                            callBack(lead, false, "Lead Found");

                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },
    }
    return lead_component;
}