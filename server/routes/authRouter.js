const express = require("express");
const { verifySignUp } = require("../middleware");
const authcontroller = require("../controllers/authController");
//const authRouter = express.Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authcontroller.signup
  );

  app.post(
    "/api/auth/createdr",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authcontroller.createdr
  );

  app.post("/api/auth/signin", authcontroller.signin);
};
