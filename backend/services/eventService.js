const dynamoDB = require("../config/aws");
const { TABLES } = require("../config/constants");

const {
  PutCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

async function createEvent(event) {

  await dynamoDB.send(
    new PutCommand({
      TableName: TABLES.EVENTS,
      Item: event,
    })
  );

  return event;

}

async function getAllEvents() {
  const response = await dynamoDB.send(
    new ScanCommand({
      TableName: TABLES.EVENTS,
    })
  );

  return response.Items || [];
}

module.exports = {
  createEvent,
  getAllEvents,
};