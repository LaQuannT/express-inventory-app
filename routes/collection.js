const express = require("express");
const router = express.Router();

const sneaker_controller = require("../controllers/sneakerController");

router.get("/", sneaker_controller.index);

module.exports = router;
