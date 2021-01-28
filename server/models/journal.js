const mongoose = require("mongoose");

const Journal = mongoose.model(
  "Journal",
  new mongoose.Schema({
    visitId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visit"
      },
      patientId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
  diagnosis: {
    type: String,
    required: false
  },
  workDone: {
    type: String,
    required: false
  },
  treatment: {
    type: String,
    required: false
  }
})
);

module.exports = Journal;
