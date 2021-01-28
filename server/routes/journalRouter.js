const { authJwt } = require("../middleware");
const controller = require("../controllers/journalController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/test/doctor/journal",
   [authJwt.verifyToken, authJwt.isDoctor],
    controller.getWrites
  );
  app.post(
    "/api/test/doctor/journal",
   [authJwt.verifyToken, authJwt.isDoctor],
    controller.postSaveWrite
  );
};
