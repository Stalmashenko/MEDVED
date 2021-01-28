const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
//console.log(token);
  if (!token) {
    console.log("403");
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("ERROR");
      return res.status(401).send({ message: "Unauthorized!" });
    }
  //  console.log("ERROR2");
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Administrator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Administrator Role!" });
        return;
      }
    );
  });
};

isPatient = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Patient") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Patient Role!" });
        return;
      }
    );
  });
};

isDoctor = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Doctor") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Doctor Role!" });
        return;
      }
    );
  });
};

isManager = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Manager") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Manager Role!" });
        return;
      }
    );
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isPatient,
  isDoctor,
  isManager
};
module.exports = authJwt;
