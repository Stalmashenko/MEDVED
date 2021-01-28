const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    birthDay: {
      type: Date,
      required: false
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other'
    },
    address: {
          street: String,
          city: String,
          state: String,
          zip: Number
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = Test;
