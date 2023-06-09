const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, required: true },
});

BrandSchema.virtual("url").get(function () {
  return `/collection/brand/${this._id}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
