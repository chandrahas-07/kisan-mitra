const express = require("express");

const router = express.Router();

const {
  getAllBatches,
} = require("../controllers/batchController");

router.get("/", getAllBatches);

module.exports = router;