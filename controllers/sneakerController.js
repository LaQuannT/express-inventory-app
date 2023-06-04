const Sneaker = require("../models/sneaker");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Index");
});

exports.sneaker_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker list");
});

exports.sneaker_details = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker details");
});

exports.sneaker_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker create get");
});

exports.sneaker_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker create post");
});

exports.sneaker_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker delete get");
});

exports.sneaker_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker delete post");
});

exports.sneaker_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker update get");
});

exports.sneaker_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker update post");
});
