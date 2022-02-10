const express = require("express");
const { signup } = require("./userControllers");

const router = express.Router();

router.post("/", signup);

module.exports = router;
