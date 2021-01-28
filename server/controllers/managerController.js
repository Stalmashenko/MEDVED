const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;
const DoctorTime = db.doctorTime;
const Visit = db.visit;
const Role = db.role;
const Time = db.time;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getAllDrs = (req, res) => {
//  const roles = await Role.findAll();
//  const vrach = await roles.findOne({ name: 'Doctor' }).exec()
  User.find()
    .populate("roles", "-__v")
  //User.findAll({ 'roles[0]': "5fb40873252f763690284959"})
.then(users => {
  console.log(users);
  users = users.filter(user => !!user.roles.find(role => role.name === "Doctor"));
  res.send(users);
  //res.render(REACT_URL+'createschedule', {
  //  users: users
})
.catch(err => {
  // const error = new Error(err);
  // error.httpStatusCode = 500;
  // return next(error);
});
}

exports.postTime = (req, res) => {
//  console.log("POSTTIME", req.body);
  let docTime = new DoctorTime({
    workTime: req.body.time,
    workDate: req.body.date,
    doctorId: req.body.doctor
  });

  let visitTime = new Visit({
    visitTime: req.body.time,
    visitDate: req.body.date,
    doctorId: req.body.doctor,
    patientId: req.body.doctor,
    status: "Open"
  });

/*  DoctorTime.create({time: "11:00", date: "20-01-2000"}, function(err, doc){
      mongoose.disconnect();

      if(err) return console.log(err);

      console.log("Сохранен объект doctime", doc);
  });*/
  docTime.save((err, docTime) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
});

visitTime.save((err, visitTime) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
});
}
