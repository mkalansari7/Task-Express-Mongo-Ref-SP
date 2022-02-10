const express = require("express");
const { getShop, createShop, productCreate } = require("./controllers");

const router = express.Router();

router.get("/", getShop);
router.post("/", createShop);
router.post("/:shopId/products", productCreate);

module.exports = router;
