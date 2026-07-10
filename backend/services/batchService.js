const dynamoDB = require("../config/aws");
const { TABLES } = require("../config/constants");

const {
  ScanCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
async function getAllBatches() {
  const response = await dynamoDB.send(
    new ScanCommand({
      TableName: TABLES.CROP_BATCHES,
    })
  );

  return response.Items || [];
}

async function updateBatch(batch) {

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLES.CROP_BATCHES,
      Item: batch,
    })
  );

}

module.exports = {
  getAllBatches,
  updateBatch,
};