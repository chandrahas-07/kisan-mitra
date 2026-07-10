const dynamoDB = require("../config/aws");
const { TABLES } = require("../config/constants");

const {
  PutCommand,
  ScanCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

async function createUser(user) {
  await dynamoDB.send(
    new PutCommand({
      TableName: TABLES.USERS,
      Item: user,
    })
  );
}

async function getUsers() {
  const response = await dynamoDB.send(
    new ScanCommand({
      TableName: TABLES.USERS,
    })
  );

  return response.Items || [];
}

async function getUserByEmail(email) {

  const response = await dynamoDB.send(
    new QueryCommand({
      TableName: TABLES.USERS,

      IndexName: "email-index",

      KeyConditionExpression: "email = :email",

      ExpressionAttributeValues: {
        ":email": email,
      },
    })
  );

  return response.Items?.[0] || null;
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
};