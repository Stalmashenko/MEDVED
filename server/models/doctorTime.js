const mongoose = require('mongoose');

const DoctorTime = mongoose.model(
  "DoctorTime",
  new mongoose.Schema({
    workTime: String,
    workDate: String,
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
  })
);

module.exports = DoctorTime;
