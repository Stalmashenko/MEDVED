const { authJwt } = require("../middleware");
const controller = require("../controllers/doctorController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/doctor/drschedule",
   [authJwt.verifyToken, authJwt.isDoctor],
    controller.getSchedule
  );
/*  app.post(
    "/api/test/manager/posttime",
   [authJwt.verifyToken, authJwt.isManager],
    controller.postTime
  );*/
  app.get(
    `/api/test/doctor/info/:id`,
   //[authJwt.verifyToken, authJwt.isDoctor],
    controller.getInfo
  );
};
