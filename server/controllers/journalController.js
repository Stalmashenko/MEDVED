const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;
const DoctorTime = db.doctorTime;
const Visit = db.visit;
const Journal = db.journal;
const Role = db.role;
const Time = db.time;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getWrites = (req, res) => {
    const userId = req.headers.userid;
    Journal.find()
    .populate("visitId")
    .populate("patientId")
.then(jour => {
  console.log("LALALALALALAALAALLALALALALAALALALALALALA" + jour);
    jour = jour.filter(j => j.visitId.doctorId == userId);

    console.log("BIGGGGGGGg"+jour);
    res.send(jour);
})
.catch(err => {
  // const error = new Error(err);
  // error.httpStatusCode = 500;
  // return next(error);
})
};

exports.postSaveWrite = (req, res) => {
    const writeid = req.body.writeid;
    let changeWrite;
    const userId = req.headers.userid;
    Journal.findOne({
    //  resetToken: passwordToken,
    //  resetTokenExpiration: { $gt: Date.now() },
      _id: writeid
    })
      .then(write => {
        console.log(write);
        changeWrite = write;
        changeWrite.workDone = req.body.workdone;
        changeWrite.diagnosis = req.body.diagnosis;
        changeWrite.save();

        Visit.findOne({
          _id: changeWrite.visitId
        })
        .then(visit => {
          console.log(visit);
visit.status = "Done";
visit.save();
        })
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };
