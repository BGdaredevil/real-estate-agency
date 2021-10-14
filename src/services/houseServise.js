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
  return HouseModel.findById(id).populate("tenants").lean();
};

const updateOne = (id, data) => {
  console.log("in upd", id);
  return HouseModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
};

const houseService = { getLastThree, create, getAll, getOne, updateOne };

module.exports = houseService;
