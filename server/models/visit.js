const mongoose = require("mongoose");

const Visit = mongoose.model(
  "Visit",
  new mongoose.Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  visitTime: {
    type: String
  },
  visitDate: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['Cancel', 'Done', 'Ok', 'Open']
  }
  })
);

module.exports = Visit;
