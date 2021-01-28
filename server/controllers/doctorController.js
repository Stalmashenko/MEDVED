const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;
const DoctorTime = db.doctorTime;
const Visit = db.visit;
const Role = db.role;
const Time = db.time;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getSchedule = (req, res) => {
//  const roles = await Role.findAll();
//  const vrach = await roles.findOne({ name: 'Doctor' }).exec()
const userId = req.headers.userid;
  Visit.find()
    .populate("roles", "-__v")
  //User.findAll({ 'roles[0]': "5fb40873252f763690284959"})
.then(visits => {
  console.log(userId);
  //visits = visits.filter(visit => visit.doctorId == userId );
  visits = visits.filter(visit => visit.doctorId == userId &&( visit.status == 'Open' || visit.status == 'Ok'));
console.log("GOVNO"+visits);

  res.send(visits);
  //res.render(REACT_URL+'createschedule', {
  //  users: users
})
.catch(err => {
  // const error = new Error(err);
  // error.httpStatusCode = 500;
  // return next(error);
});
}


exports.getInfo = (req, res) => {
//  const roles = await Role.findAll();
//  const vrach = await roles.findOne({ name: 'Doctor' }).exec()
const userId = req.params.id;
  Visit.find()
    .populate("roles", "-__v")
  //User.findAll({ 'roles[0]': "5fb40873252f763690284959"})
.then(visits => {
  console.log(userId);
  visits = visits.filter(visit => visit.doctorId == userId && visit.status == 'Open');
  console.log("GOVNO"+visits);

  res.send(visits);
  //res.render(REACT_URL+'createschedule', {
  //  users: users
})
.catch(err => {
  // const error = new Error(err);
  // error.httpStatusCode = 500;
  // return next(error);
});
}
