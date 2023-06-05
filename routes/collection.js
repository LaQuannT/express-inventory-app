const express = require("express");
const router = express.Router();

const sneaker_controller = require("../controllers/sneakerController");
const brand_controller = require("../controllers/brandController");

router.get("/", sneaker_controller.index);
router.get("/sneakers", sneaker_controller.sneaker_list);
router.get("/brands", brand_controller.brand_list);

router
  .route("/sneaker/create")
  .get(sneaker_controller.sneaker_create_get)
  .post(sneaker_controller.sneaker_create_post);

router
  .route("/sneaker/:id/delete")
  .get(sneaker_controller.sneaker_delete_get)
  .post(sneaker_controller.sneaker_delete_post);

router
  .route("/sneaker/:id/update")
  .get(sneaker_controller.sneaker_update_get)
  .post(sneaker_controller.sneaker_update_post);

router.get("/sneaker/:id", sneaker_controller.sneaker_details);

router
  .route("/brand/create")
  .get(brand_controller.brand_create_get)
  .post(brand_controller.brand_create_post);

router
  .route("/brand/:id/delete")
  .get(brand_controller.brand_delete_get)
  .post(brand_controller.brand_delete_post);

router
  .route("/brand/:id/update")
  .get(brand_controller.brand_update_get)
  .post(brand_controller.brand_update_post);

router.get("/brand/:id", brand_controller.brand_details);

module.exports = router;
