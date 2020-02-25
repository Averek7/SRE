module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var batchtype_module = {

        //Start of batch Exists
        batchtype_exists: function (batchtype_name, callBack) {
            try {
                exists = false;
                user_token = false;
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.BATCHTYPE).find({ "batchtype_name": batchtype_name });
                    cursor.forEach(function (doc, err) {
                        assert.equal(null, err);
                        exists = true;
                        user_token = doc.user_token;
                    }, function () {
                        if (exists) {
                            callBack(user_token, true, "Batch name already exists");
                        }
                        else {
                            callBack(exists, false, "Batch name not exists");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        //End of Student Exists

        // //Start of User Exists
        // userExists: function(user_token, callBack) {
        //   try {
        //     var userExists = false; 
        //     mongo.connect(url, {useNewUrlParser: true}, 
        //       function (err, db) {
        //       assert.equal(null, err);
        //       var cursor = db.db().collection(dbb.USER).find({ "user_token": user_token });
        //       cursor.forEach(function (doc, err) {
        //         assert.equal(null, err);
        //         userExists = true;
        //       }, function(){
        //         if (userExists) {
        //             callBack(userExists, true, "");
        //         } else {
        //             callBack(userExists, false, "User Does not Exists!");
        //           }
        //           db.close();
        //           })
        //       })
        //   } catch (e) {
        //       callBack(null, true, e);
        //   }
        // },

        // //End of User Exists

        //Start of Add Student
        add_batchtype: function (new_batchtype, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.BATCHTYPE).insertOne(new_batchtype, function (err, result) {
                        if (err) {
                            callBack(null, false, "Error Occurred");
                        }
                        else {
                            callBack(result, true, "Batchtype Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        //End of Add batchtype

        //Start of Update batchtype
        update_batchtype: function (id,duration,batchtype_name,callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.BATCHTYPE).updateOne({ "_id": new ObjectID(id) }, {
                        $set: {
                         
                            batchtype_name:batchtype_name,
                            duration:duration,

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
        //End of Update batchtype

        //Start of View all batchtype
        view_all_batchtype: function (callBack) {
            try {
                batchtype = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.BATCHTYPE).find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            batchtype.push(doc);
                        }
                    }, function () {
                        if (batchtype.length == 0) {
                            callBack(null, true, "No Student's Found");
                        }
                        else {
                            callBack(batchtype, false, "Students Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        //End of View all batchtype

        //Start of Search batchtype
        search_batchtype: function (keyword, callBack) {
            try {
                batchtype = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.BATCHTYPE).find({ batchtype_name: { $regex: keyword }, type: "S" });
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                        }
                        else {
                            batchtype.push(doc);
                        }
                    }, function () {
                        if (batchtype.length == 0) {
                            callBack(null, true, "No batchtype's Found");
                        }
                        else {
                            callBack(btachtype, false, "Batchtype Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }

        },

        //End of Search batchtype

        //Start of Delete batchtype

        delete_batchtype: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.BATCHTYPE).updateOne({ "_id": new ObjectID(id) }, {
                        $set: {
                            active: false,
                            deletion_date: new Date(),
                        }
                    }, { upsert: false }, function (err, result) {
                        if (err) {
                            callBack(null, true, err);
                        } else {
                            callBack(result, false, "Deleted Successfully");
                        }
                        db.close();
                    });
                });
            } catch (e) {
                callBack(null, true, e);
            }
        },

        //End of Delete Student


        //Start of Register Domain
        // register_domain: function (student_id, domain_id, callBack) {
        //     try {
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             db.db().collection(dbb.USER).updateOne({ "_id": new ObjectID(student_id) },
        //                 { $push: { domains: domain_id } },
        //                 { upsert: false }, function (err, result) {
        //                     if (err) {
        //                         callBack(null, true, err);
        //                     } else {
        //                         callBack(result, false, "Successfully Registered to Domain");
        //                     }
        //                     db.close();
        //                 });
        //         });
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },
        //End of Register Domain

        //Start of Already Registered Domain
        // already_registered: function (student_id, domain_id, callBack) {
        //     try {
        //         exists = false;
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             var cursor = db.db().collection(dbb.USER).find({ "_id": new ObjectID(student_id), "domains": domain_id });
        //             cursor.forEach(function (doc, err) {
        //                 assert.equal(null, err);
        //                 exists = true;
        //             }, function () {
        //                 if (exists) {
        //                     callBack(exists, true, "Already Registered!");
        //                 }
        //                 else {
        //                     callBack(exists, false, "");
        //                 }
        //                 db.close();
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },

        //End of Already Registered Domain


        //Start of Add To Batch
        // add_to_batch: function (student_id, batch_id, callBack) {
        //     try {
        //         std_count = false;
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             db.db().collection(dbb.USER).updateOne({ "_id": new ObjectID(student_id) },
        //                 { $push: { batches: batch_id } },
        //                 { upsert: false }, function (err, result) {
        //                     if (err) {
        //                         callBack(null, true, err);
        //                         db.close();
        //                     } else {
        //                         //Getting Current Student Count
        //                         var cursor = db.db().collection(dbb.batch_details).find({ "_id": new ObjectID(batch_id) });
        //                         cursor.forEach(function (doc, err) {
        //                             assert.equal(null, err);
        //                             std_count = doc.student_count;
        //                         }, function () {
        //                             if (std_count != null) {
        //                                 //Increment Student Count by 1
        //                                 db.db().collection(dbb.batch_details).updateOne({ "_id": new ObjectID(batch_id) }, {
        //                                     $set: {
        //                                         student_count: std_count += 1,
        //                                     }
        //                                 }, { upsert: false }, function (err, result) {
        //                                     if (err) {
        //                                         callBack(null, true, err);
        //                                     } else {
        //                                         callBack(result, false, "Student Added To Batch");
        //                                     }
        //                                     db.close();
        //                                 })
        //                             }
        //                             else {
        //                                 callBack(exists, false, "Student count not found!");
        //                             }
        //                             db.close();
        //                         });
        //                     }
        //                     db.close();
        //                 });
        //         });
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },
        //End of Add To Batch

        //Start of Already Added
        // already_added: function (student_id, batch_id, callBack) {
        //     try {
        //         exists = false;
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             var cursor = db.db().collection(dbb.USER).find({ "_id": new ObjectID(student_id), "batches": batch_id });
        //             cursor.forEach(function (doc, err) {
        //                 assert.equal(null, err);
        //                 exists = true;
        //             }, function () {
        //                 if (exists) {
        //                     callBack(exists, true, "Already Added!");
        //                 }
        //                 else {
        //                     callBack(exists, false, "");
        //                 }
        //                 db.close();
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },

        //End of Already Added

        //Start of Validate UUID
        // validate_uuid: function (device_uuid, email, callBack) {
        //     try {
        //         exists = false;
        //         uuid_details = [];
        //         var type = "";
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             var cursor = db.db().collection(dbb.USER).find({ "email": email });
        //             cursor.forEach(function (doc, err) {
        //                 assert.equal(null, err);
        //                 exists = true;
        //                 uuid_details.push(doc.uuid);
        //                 type = doc.type;
        //             }, function () {
        //                 if (exists) {
        //                     uuid_exists = false;
        //                     var cursor1 = db.db().collection(dbb.USER).find({ "uuid": device_uuid });
        //                     cursor1.forEach(function (doc, err) {
        //                         assert.equal(null, err);
        //                         uuid_exists = true;
        //                     }, function () {
        //                         if (uuid_exists) {
        //                             callBack(true, "Uuid Exists!", type);
        //                             db.close();
        //                         }
        //                         else {
        //                             if (uuid_details[0].length == 0) {
        //                                 db.db().collection(dbb.USER).updateOne({ "email": email },
        //                                     { $push: { uuid: device_uuid } },
        //                                     { upsert: false }, function (err) {
        //                                         if (err) {
        //                                             callBack(false, err, "");
        //                                         } else {
        //                                             callBack(true, "added new uuid", type);
        //                                         }
        //                                         db.close();
        //                                     });
        //                             }
        //                             else if (uuid_details[0].length < 3) {
        //                                 db.db().collection(dbb.USER).updateOne({ "email": email },
        //                                     { $push: { uuid: device_uuid } },
        //                                     { upsert: false }, function (err) {
        //                                         if (err) {
        //                                             callBack(false, err);
        //                                         } else {
        //                                             callBack(true, "added new uuid");
        //                                         }
        //                                         db.close();
        //                                     });
        //                             }
        //                             else {
        //                                 // console.log(uuid_details[0].length);
        //                                 // console.log("limit crossed");
        //                                 callBack(false, "Uuid limit crossed, Do not proceed!!");
        //                                 db.close();
        //                             }
        //                         }
        //                         db.close();
        //                     })
        //                 }
        //                 else {
        //                     callBack(false, "Email not found.");
        //                 }
        //                 db.close();
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },

        //End of Validate UUID

        //Start of Update Token
        // update_token: function (email, user_token, profile_img_url, callBack) {
        //     try {
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             db.db().collection(dbb.USER).updateOne({ "email": email },
        //                 {
        //                     $set:
        //                     {
        //                         user_token: user_token,
        //                         profile_img_url: profile_img_url
        //                     },
        //                 },
        //                 { upsert: false }, function (err, result) {
        //                     if (err) {
        //                         callBack(null, true, err);
        //                     } else {
        //                         callBack(result, false, "Updated user_token");
        //                     }
        //                     db.close();
        //                 });
        //         });
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },

        //End of Update Token

        //Start of Get Forums
        // get_forums: function (batch_arr, callBack) {
        //     try {
        //         forums = [];

        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             console.log(batch_arr);
        //             var cursor = db.db().collection(dbb.forum).find({ batches: { "$in": batch_arr } })
        //             // var cursor = db.db().collection(dbb.forum).find({ batches: batch_arr } )
        //             cursor.forEach(function (doc, err) {
        //                 if (err) {
        //                     callBack(null, true, err);
        //                     db.close();
        //                 }
        //                 else {
        //                     console.log(doc);
        //                     forums.push(doc);
        //                 }
        //             }, function () {
        //                 if (forums.length == 0) {
        //                     callBack(null, true, "No Forums Found");
        //                 }
        //                 else {
        //                     callBack(forums, false, "Forums Found");
        //                 }
        //                 db.close();
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },
        //End of Get Forums

        //Start of Get Batchs
        // get_batchs: function (student_id, callBack) {
        //     try {
        //         batchs = [];
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             var cursor = db.db().collection(dbb.USER).find({ _id: new ObjectID(student_id) })
        //             cursor.forEach(function (doc, err) {
        //                 if (err) {
        //                     callBack(null, true, err);
        //                     db.close();
        //                 }
        //                 else {
        //                     batchs = doc.batches;
        //                 }
        //             }, function () {
        //                 if (batchs.length == 0) {
        //                     callBack(null, true, "No Batchs Found");
        //                 }
        //                 else {
        //                     callBack(batchs, false, "Batchs Found");
        //                 }
        //                 db.close();
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },
        //End of Get Batchs

        // get_student_domain: function (student_id, callBack) {
        //     try {
        //         domains = [];
        //         domain_details = [];
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);

        //             var cursor = db.db().collection(dbb.USER).find({ _id: new ObjectID(student_id) })
        //             cursor.forEach(function (doc, err) {
        //                 if (err) {
        //                     callBack(null, true, err);
        //                     db.close();
        //                 }
        //                 else {
        //                     domains = doc.domains;
        //                 }
        //             }, function () {
        //                 if (domains.length == 0) {
        //                     callBack(null, true, "No Domains Found");
        //                     db.close();
        //                 }
        //                 else {
        //                     for (var i = 0; i < domains.length; i++) {
        //                         domains[i] = new ObjectID(domains[i]);
        //                     }
        //                     var cursor2 = db.db().collection(dbb.domains).find({ _id: { "$in": domains } })
        //                     cursor2.forEach(function (doc2, err) {
        //                         if (err) {
        //                             callBack(null, true, err);
        //                             db.close();
        //                         }
        //                         else {
        //                             domain_details.push(doc2);
        //                         }
        //                     }, function () {
        //                         callBack(domain_details, false, "Domains Found");
        //                         db.close();
        //                     })

        //                 }
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },
        //End of Get Batchs


        //Start of Logout
        // logout: function (user_token, device_uuid, callBack) {
        //     try {
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             db.db().collection(dbb.USER).updateOne({ "user_token": user_token, "uuid": device_uuid },
        //                 {
        //                     $pull:
        //                     {
        //                         uuid: device_uuid
        //                     }
        //                 },
        //                 { upsert: false }, function (err, result) {
        //                     if (err) {
        //                         callBack(null, true, err);
        //                     } else {
        //                         callBack(result, false, "Logout Successful");
        //                     }
        //                     db.close();
        //                 });
        //         });
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },


        //End of Logout

        //Start of view Profile
        // view_profile: function (student_id, callBack) {
        //     try {
        //         students = [];
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             var cursor = db.db().collection(dbb.USER).find({ "_id": new ObjectID(student_id), type: "S" });
        //             cursor.forEach(function (doc, err) {
        //                 if (err) {
        //                     callBack(null, true, err);
        //                     db.close();
        //                 }
        //                 else {
        //                     var doc = {
        //                         name: doc.name,
        //                         email: doc.email,
        //                         contact_no: doc.contact_no,
        //                         education: doc.education,
        //                         college_name: doc.college_name,
        //                         degree: doc.degree,

        //                     };
        //                     students.push(doc);
        //                 }
        //             }, function () {
        //                 if (students.length == 0) {
        //                     callBack(null, true, "No Profile Found");
        //                 }
        //                 else {
        //                     callBack(students, false, "Profile Found");
        //                 }
        //                 db.close();
        //             })
        //         })
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },


        //End of view Profile


        //Start of edit profile
        // edit_profile: function (student_id, name, email, contact_no, education, college_name, degree, callBack) {
        //     try {
        //         mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
        //             assert.equal(null, err);
        //             db.db().collection(dbb.USER).updateOne({ "_id": new ObjectID(student_id) },
        //                 {
        //                     $set:
        //                     {
        //                         name: name,
        //                         email: email,
        //                         contact_no: contact_no,
        //                         education: education,
        //                         college_name: college_name,
        //                         degree: degree
        //                     }
        //                 },
        //                 { upsert: false }, function (err, result) {
        //                     if (err) {
        //                         callBack(null, true, err);
        //                     } else {
        //                         callBack(result, false, "Profile Edited Successful");
        //                     }
        //                     db.close();
        //                 });
        //         });
        //     } catch (e) {
        //         callBack(null, true, e);
        //     }
        // },


        //End of edit profile

    }
    return batchtype_module;
}