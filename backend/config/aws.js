const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const dynamoDB = DynamoDBDocumentClient.from(client);

module.exports = dynamoDB;