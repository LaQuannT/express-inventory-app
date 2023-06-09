const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  colorway: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  price: { type: String, required: true },
  pairs: { type: Number, min: 1, required: true },
});

SneakerSchema.virtual("url").get(function () {
  return `/collection/sneaker/${this._id}`;
});

module.exports = mongoose.model("Sneaker", SneakerSchema);
