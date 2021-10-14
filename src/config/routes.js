const router = require("express").Router();
const homeController = require("../controllers/homeController.js");

const userController = require("../controllers/userController.js");
const houseController = require("../controllers/houseController.js");
// const viewObj = require("../utils/decoViewObject.js");
// const createController = require("../controllers/cubeController.js");
// const accessoryController = require("../controllers/accessoryController.js");
// const { routeGuard } = require("../services/authService.js");

//debug
// function logger(req, res, next) {
//   console.log(req.path);
//   next();
// }
// router.use(logger);

router.use("/", homeController);
router.use("/user", userController);
router.use("/house", houseController);
router.use("*", (req, res) => {
  console.log("called 404");
  res.status(404).render("404");
});

module.exports = router;
