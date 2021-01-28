const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;
const DoctorTime = db.doctorTime;
const Visit = db.visit;
const Role = db.role;
const Time = db.time;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


  exports.getTicket = (req, res) => {
    const userId = req.headers.userid;
    console.log("LALALALALALAALAALLALALALALAALALALALALALA" + userId);

    Visit.find()
    .populate("doctorId", "-__v")
  //User.findAll({ 'roles[0]': "5fb40873252f763690284959"})
.then(visits => {
  console.log(visits);
  visits = visits.filter(visit => visit.patientId == userId);
  res.send(visits);
  //res.render(REACT_URL+'createschedule', {
  //  users: users
})
.catch(err => {
  // const error = new Error(err);
  // error.httpStatusCode = 500;
  // return next(error);
});
};
