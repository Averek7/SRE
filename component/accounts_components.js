module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var accounts_module = {
        add_account: function (new_account, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.ACCOUNT).insertOne(new_account, function (err, result) {
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

        update_account: function (user_id, user_name, company_name, company_logo,contact_no, callBack) {
            try{
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.ACCOUNT).updateOne({ "_id": new ObjectID(user_id) }, {
                        $set: {
                            // email: email,
                            // user_id: user_id,
                            user_name: user_name,
                            company_name: company_name ,
                            company_logo: company_logo,
                            contact_no: contact_no,
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

            view_user_account: function (user_id,callBack) {
                try {
                    account = [];
                    mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                        assert.equal(null, err);
                        var cursor = db.db().collection(dbb.ACCOUNT).find({'_id':user_id});
                        cursor.forEach(function (doc, err) {
                            if (err) {
                                callBack(null, true, err);
                                db.close();
                            }
                            else {
                                account.push(doc);
                            }
                        }, function () {
    
                            callBack(account, false, "Account Found");
    
                            db.close();
                        })
                    })
                } catch (e) {
                    callBack(null, true, e);
                }
            },
    }
}