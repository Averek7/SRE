module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var payment_module = {


        add_payment: function (new_payment, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.PAYMENT).insertOne(new_payment, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "payment Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        view_student_payment: function (student_id, callBack) {
            try {
                payment = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.PAYMENT).find({ "student_id": student_id });
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            payment.push(doc);
                        }
                    }, function () {
                        if (payment.length == 0) {
                            callBack(null, true, "No payment's Found In This Course");
                        }
                        else {
                            callBack(payment, false, "payment Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        
    }

    return payment_module;
}
