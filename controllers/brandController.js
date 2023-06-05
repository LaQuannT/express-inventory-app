const Brand = require("../models/brand");

const asyncHandler = require("express-async-handler");

exports.brand_list = asyncHandler(async (req, res, next) => {
  const brandList = await Brand.find({}, "name").sort({ name: 1 }).exec();

  res.render("brand_list", { title: "All Brands", brandList });
});

exports.brand_details = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand details");
});

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand create get");
});

exports.brand_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand create post");
});

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand delete get");
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand delete post");
});

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand update get");
});

exports.brand_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Brand update post");
});
