const Brand = require("../models/brand");
const Sneaker = require("../models/sneaker");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.brand_list = asyncHandler(async (req, res, next) => {
  const brandList = await Brand.find({}, "name").sort({ name: 1 }).exec();

  res.render("brand_list", { title: "All Brands", brandList });
});

exports.brand_details = asyncHandler(async (req, res, next) => {
  const [brand, sneakersFromBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Sneaker.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (brand === null) {
    const err = new Error("Brand not found");
    err.status = 404;
    next(err);
  }

  res.render("brand_details", {
    title: "Brand Details",
    brand,
    sneakers: sneakersFromBrand,
  });
});

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.render("brand_form", { title: "Add Brand" });
});

exports.brand_create_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Brand name must contain at least 3 characters"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage("Brand description must contain at least 10 characters"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Add Brand",
        brand,
        errors: errors.array(),
      });
      return;
    } else {
      const brandExist = await Brand.findOne({ name: req.body.name }).exec();

      if (brandExist) {
        res.redirect(brandExist.url);
      } else {
        await brand.save();
        res.redirect(brand.url);
      }
    }
  }),
];

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  const [brand, sneakerList] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Sneaker.find({ brand: req.params.id }, "name").exec(),
  ]);
  res.render("Brand_delete", {
    title: "Delete Brand",
    brand,
    sneakerList,
  });
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  const [brand, sneakerUsingBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Sneaker.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (sneakerUsingBrand.length > 0) {
    res.render("Brand_delete", {
      title: "Delete Brand",
      brand,
      sneakerList: sneakerUsingBrand,
    });
    return;
  } else {
    await Brand.findByIdAndRemove(req.params.id);
    res.redirect("/collection/brands");
  }
});

exports.brand_update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();
  res.render("brand_form", { title: "Update Brand", brand });
});

exports.brand_update_post = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Brand name must contain at least 3 characters"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage("Brand description must contain at least 10 characters"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty())
      res.render("brand_form", {
        title: "Update Brand",
        brand,
        errors: errors.array(),
      });
    else {
      const updateBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        brand,
        {}
      );
      res.redirect(updateBrand.url);
    }
  }),
];
