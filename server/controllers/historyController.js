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

exports.postHistoryId = (req, res) => {
    const visitid = req.body.visitid;
    let changeVisit;
    const userId = req.headers.userid;
    console.log("VISIT ID------------------------" + visitid);
    console.log("USER ID------------------------" + userId);
    let journal = new Journal({
      visitId: visitid,
      patientId: userId
    });
    journal.save();
    Visit.findOne({
      _id: visitid
    })
      .then(visit => {
        changeVisit = visit;
        changeVisit.status = "Ok";
        changeVisit.patientId = userId;
        changeVisit.save();
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getHistory = (req, res) => {
    const userId = req.headers.userid;
    Visit.find()
    .populate("doctorId", "-__v")
.then(visits => {
  console.log(visits);
  visits = visits.filter(visit => visit.patientId == userId);
  res.send(visits);
.catch(err => {

});
};
