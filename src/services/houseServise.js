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
  return HouseModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
};

const deleteOne = (id) => {
  return HouseModel.findByIdAndDelete(id);
};

const rent = async (houseId, user) => {
  const house = await HouseModel.findById(houseId);
  console.log(user.id);
  house.tenants.push(user.id);
  return house.save();
};

const search = async (typeStr) => {
  console.log(typeStr);
  const searchObj = { type: new RegExp(typeStr, "i") };
  return HouseModel.find(searchObj).lean();
};

const houseService = { getLastThree, create, getAll, getOne, updateOne, deleteOne, rent, search };

module.exports = houseService;
