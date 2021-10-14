const router = require("express").Router();

const houseService = require("../services/houseServise.js");

const home = async (req, res) => {
  const viewObj = {};
  const topThree = await houseService.getLastThree();
  if (topThree.length > 0) {
    viewObj.houses = topThree;
  }
  res.render("home", viewObj);
};

router.get("/", home);

module.exports = router;
