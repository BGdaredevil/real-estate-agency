const HouseModel = require("../models/house.js");

const getLastThree = () => {
  return HouseModel.find({}).sort({ addedOn: -1 }).limit(3).lean();
};

const create = (data) => {
  return HouseModel.create(data);
};

const getAll = () => {
  return HouseModel.find({}).lean();
};

const getOne = (id) => {
  return HouseModel.findById(id).lean();
};

const houseService = { getLastThree, create, getAll, getOne };

module.exports = houseService;
