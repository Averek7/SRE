module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var details_module = {
        add_sender_account: function (new_sender_account, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.SENDER_ACCOUNT).insertOne(new_sender_account, function (err, result) {
                        if (err) {
                            callBack(null, true, "No Sender Account Provided");
                        }
                        else {
                            callBack(result, false, "Sender Account Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },
    }
}