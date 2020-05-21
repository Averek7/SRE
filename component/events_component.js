module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var events_module = {

        add_event: function (new_event, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.EVENTS).insertOne(new_event, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Event Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        delete_event: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.EVENTS).deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, true, "Event Removed Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        view_all_events: function (callBack) {
            try {
                events = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.EVENTS).find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            events.push(doc);
                        }
                    }, function () {
                        if (events.length == 0) {
                            callBack(null, true, "No Event's Found");
                        }
                        else {
                            callBack(events, false, "Events Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

    }
    return events_module;
}