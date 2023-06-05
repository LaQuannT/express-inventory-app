const express = require("express");
const router = express.Router();

const sneaker_controller = require("../controllers/sneakerController");
const brand_controller = require("../controllers/brandController");

router.get("/", sneaker_controller.index);

router.get("/sneaker/all", sneaker_controller.sneaker_list);

router.get("/brand/all", brand_controller.brand_list);

module.exports = router;
