const dynamoDB = require("../config/aws");

const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const batches = [
  {
    batchId: "BATCH-001",
    crop: "Onion",
    temperature: 4.2,
    humidity: 82,
    status: "Healthy",
    updatedAt: new Date().toISOString(),
  },
  {
    batchId: "BATCH-002",
    crop: "Potato",
    temperature: 5.1,
    humidity: 80,
    status: "Healthy",
    updatedAt: new Date().toISOString(),
  },
  {
    batchId: "BATCH-003",
    crop: "Chili",
    temperature: 7.0,
    humidity: 76,
    status: "Warning",
    updatedAt: new Date().toISOString(),
  },
  {
    batchId: "BATCH-004",
    crop: "Tomato",
    temperature: 8.8,
    humidity: 73,
    status: "Critical",
    updatedAt: new Date().toISOString(),
  },
  {
    batchId: "BATCH-005",
    crop: "Onion",
    temperature: 3.9,
    humidity: 84,
    status: "Healthy",
    updatedAt: new Date().toISOString(),
  },
  {
    batchId: "BATCH-006",
    crop: "Potato",
    temperature: 6.4,
    humidity: 79,
    status: "Warning",
    updatedAt: new Date().toISOString(),
  },
];

async function seed() {
  try {
    for (const batch of batches) {
      await dynamoDB.send(
        new PutCommand({
          TableName: "CropBatches",
          Item: batch,
        })
      );

      console.log(` Inserted ${batch.batchId}`);
    }

    console.log("\n CropBatches seeded successfully.");
  } catch (error) {
    console.error(" Error seeding data:");
    console.error(error);
  }
}

seed();