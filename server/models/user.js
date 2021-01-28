const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
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
    photo: {
      type: String,
      required: false
    },
    description: {
      type: String
    },
    birthDay: {
      type: String,
      required: false
    },
    address: {
          type: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
