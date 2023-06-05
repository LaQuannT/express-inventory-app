const Sneaker = require("../models/sneaker");
const Brand = require("../models/brand");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numSneakers, numBrands] = await Promise.all([
    Sneaker.countDocuments({}).exec(),
    Brand.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "My Sneaker Collection",
    numSneakers,
    numBrands,
  });
});

exports.sneaker_list = asyncHandler(async (req, res, next) => {
  const sneakerList = await Sneaker.find({}, "name").sort({ name: 1 }).exec();

  res.render("sneaker_list", { title: "All Sneakers", sneakerList });
});

exports.sneaker_details = asyncHandler(async (req, res, next) => {
  const sneaker = await Sneaker.findById(req.params.id)
    .populate("brand")
    .exec();
  res.render("sneaker_details", { sneaker });
});

exports.sneaker_create_get = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();
  res.render("sneaker_form", {
    title: "Add Sneaker",
    brands: allBrands,
  });
});

exports.sneaker_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("colorway", "Coloway must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must be a value with 2 decimal places.")
    .isFloat({ min: 0.0 })
    .escape(),
  body("pairs", "Must contain at least 1 pair.").isNumeric().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const sneaker = new Sneaker({
      name: req.body.name,
      description: req.body.description,
      colorway: req.body.colorway,
      brand: req.body.brand,
      price: req.body.price,
      pairs: req.body.pairs,
    });

    if (!errors.isEmpty()) {
      const validBrands = await Brand.find().exec();

      res.render("sneaker_form", {
        title: "Add Sneaker",
        brands: validBrands,
        sneaker,
        errors: errors.array(),
      });
    } else {
      await sneaker.save();
      res.redirect(sneaker.url);
    }
  }),
];

exports.sneaker_delete_get = asyncHandler(async (req, res, next) => {
  const sneaker = await Sneaker.findById(req.params.id).exec();
  res.render("sneaker_delete", { title: "Sneaker", sneaker });
});

exports.sneaker_delete_post = asyncHandler(async (req, res, next) => {
  await Sneaker.findByIdAndRemove(req.body.sneakerid).exec();
  res.redirect("/collection/sneakers");
});

exports.sneaker_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker update get");
});

exports.sneaker_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLENTED: Sneaker update post");
});
