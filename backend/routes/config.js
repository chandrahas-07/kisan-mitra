const express = require("express");

const {
  getParameter,
} = require("../services/parameterStoreService");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const region = await getParameter("/kisan-mitra/AWS_REGION");

    const topicArn = await getParameter("/kisan-mitra/SNS_TOPIC_ARN");

    res.json({
      success: true,
      message: "Successfully connected to Parameter Store.",
      region,
      topicArn,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;