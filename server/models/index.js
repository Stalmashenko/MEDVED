const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.doctorTime = require("./doctorTime");
db.visit = require("./visit");
db.role = require("./role");
db.journal = require("./journal");



db.ROLES = ["Patient", "Administrator", "Manager", "Doctor"];

module.exports = db;
