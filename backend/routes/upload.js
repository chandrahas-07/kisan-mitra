const express = require("express");
const multer = require("multer");

const { uploadFile } = require("../services/s3Service");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const result = await uploadFile(req.file);

res.json({
  success: true,
  imageKey: result.key,
  imageUrl: result.url,
});

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
      });

    }

  }
);

module.exports = router;