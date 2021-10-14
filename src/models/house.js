const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Apartment", "Villa", "House"] },
  yearBuilt: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  availablePieces: { type: Number, required: true },
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
