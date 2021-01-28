const { authJwt } = require("../middleware");
const controller = require("../controllers/managerController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/manager/createschedule",
   [authJwt.verifyToken, authJwt.isManager],
    controller.getAllDrs
  );
  app.post(
    "/api/test/manager/posttime",
   [authJwt.verifyToken, authJwt.isManager],
    controller.postTime
  );
};
