const dynamoDB = require("../config/aws");

const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

async function getCropBatches() {

  const response = await dynamoDB.send(
    new ScanCommand({
      TableName: "CropBatches",
    })
  );

  return response.Items || [];
}

module.exports = {
  getCropBatches,
};