const router = require("express").Router();
const validator = require("validator");

const houseService = require("../services/houseServise.js");

const create = (req, res) => {
  const escapedHome = {
    name: validator.escape(req.body.name.trim()),
    type: validator.escape(req.body.type.trim()),
    yearBuilt: validator.escape(req.body.yearBuilt.trim()),
    location: validator.escape(req.body.location.trim()),
    imageUrl: req.body.imageUrl.trim(),
    description: validator.escape(req.body.description.trim()),
    availablePieces: validator.escape(req.body.availablePieces.trim()),
  };

  if (Object.values(escapedHome).includes("")) {
    console.log("empty detected");
    escapedHome.error = { message: "All fields are mandatory" };
    res.render("house/create", escapedHome);
    return;
  }

  console.log(validator.isURL(escapedHome.imageUrl));

  if (!validator.isURL(escapedHome.imageUrl)) {
    escapedHome.error = { message: "Please use a valid URL" };
    res.render("house/create", escapedHome);
    return;
  }

  try {
    escapedHome.owner = req.user.id;
    houseService.create(escapedHome);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/");
};

const allHouses = async (req, res) => {
  const viewObj = {};
  const houses = await houseService.getAll();
  if (houses.length > 0) {
    viewObj.houses = houses;
  }

  res.render("house/allList", viewObj);
};

const loadEdit = (req, res) => {
  res.render("house/edit");
};

const details = async (req, res) => {
  const viewObj = {};
  const house = await houseService.getOne(req.params.id);
  viewObj.house = house;
  viewObj.isOwner = house.owner == req.user._id;
  viewObj.isTenant = house.tenants.includes(req.user._ic);
  console.log(viewObj);
  res.render("house/details", viewObj);
};

const remove = (req, res) => {
  res.render("house/edit");
};

router.get("/", allHouses);
router.get("/create", (req, res) => res.render("house/create"));
router.post("/create", create);
router.get("/search", (req, res) => res.render("house/search"));
router.get("/details/:id", details);
router.get("/edit/:id", loadEdit);
router.get("/delete/:id", remove);

module.exports = router;
