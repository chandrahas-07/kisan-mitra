const dynamoDB = require("../config/aws");
const { TABLES } = require("../config/constants");

const {
  PutCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

async function createAlert(alert) {
  await dynamoDB.send(
    new PutCommand({
      TableName: TABLES.ALERTS,
      Item: alert,
    })
  );
}

async function getAllAlerts() {
  const response = await dynamoDB.send(
    new ScanCommand({
      TableName: TABLES.ALERTS,
    })
  );

  return response.Items || [];
}

module.exports = {
  createAlert,
  getAllAlerts,
};