const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 6 },
  type: { type: String, required: true },
  yearBuilt: { type: Number, required: true, min: 1850, max: 2021 },
  location: { type: String, required: true, minlength: 4 },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, maxlength: 60 },
  availablePieces: { type: Number, required: true, min: 0, max: 10 },
  addedOn: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tenants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const HouseModel = mongoose.model("House", HouseSchema);

module.exports = HouseModel;
