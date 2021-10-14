const router = require("express").Router();
const validator = require("validator");

const houseService = require("../services/houseServise.js");
const { houseEscape } = require("../utils/dataEscape.js");

const create = async (req, res) => {
  const escapedHome = houseEscape(req.body);

  if (Object.values(escapedHome).includes("")) {
    console.log("empty detected");
    escapedHome.error = { message: "All fields are mandatory" };
    res.render("house/create", escapedHome);
    return;
  }

  if (!escapedHome.isValidUrl) {
    escapedHome.error = { message: "Please use a valid URL" };
    res.render("house/create", escapedHome);
    return;
  }

  try {
    escapedHome.owner = req.user.id;
    await houseService.create(escapedHome);
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

const loadEdit = async (req, res) => {
  const house = await houseService.getOne(req.params.id);
  console.log(house);
  res.render("house/edit", house);
};

const edit = async (req, res) => {
  console.log(req.params.id);
  const escapedHouse = houseEscape(req.body);

  if (Object.values(escapedHouse).includes("")) {
    console.log("empty detected");
    escapedHouse.error = { message: "All fields are mandatory" };
    res.render(`house/edit/${req.params.id}`, escapedHouse);
    return;
  }

  if (!escapedHouse.isValidUrl) {
    escapedHouse.error = { message: "Please use a valid URL" };
    res.render(`house/edit/${req.params.id}`, escapedHouse);
    return;
  }

  try {
    console.log(escapedHouse);
    await houseService.updateOne(req.params.id, escapedHouse);
    res.redirect(`/house/details/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

const details = async (req, res) => {
  const viewObj = {};
  const house = await houseService.getOne(req.params.id);
  viewObj.house = house;
  viewObj.isOwner = house.owner == req?.user?.id;
  viewObj.isTenant = house.tenants.includes(req?.user?.id);
  viewObj.available = house.availablePieces - house.tenants.length;
  if (house.tenants.length === 0) {
    house.tenants = false;
  } else {
    house.tenants.map((t) => t.fullName).join(", ");
  }
  // console.log(viewObj);
  // // console.log(req.user);
  res.render("house/details", viewObj);
};

const remove = (req, res) => {
  res.render("house/edit");
};

router.get("/", allHouses);
router.get("/create", (req, res) => res.render("house/create"));
router.post("/create", create);
router.get("/search", (req, res) => res.render("house/search"));
router.get("/edit/:id", loadEdit);
router.post("/edit/:id", edit);
router.get("/details/:id", details);
router.get("/rent/:id", details);
router.get("/delete/:id", remove);

module.exports = router;
