const {
  getAllBatches,
  updateBatch,
} = require("../services/batchService");

const {
  processBatch,
} = require("../engine/operationsEngine");

async function simulateSensors() {
  const batches = await getAllBatches();

  for (const batch of batches) {
    const temperatureChange = (Math.random() - 0.5) * 0.8;
    const humidityChange = Math.floor((Math.random() - 0.5) * 4);

    batch.temperature = Number(
      Math.max(
        1,
        Math.min(12, batch.temperature + temperatureChange)
      ).toFixed(1)
    );

    batch.humidity = Math.max(
      65,
      Math.min(95, batch.humidity + humidityChange)
    );

    await processBatch(batch);
    await updateBatch(batch);
  }

  console.log(
    `Sensor cycle completed at ${new Date().toLocaleTimeString()}`
  );
}

module.exports = {
  simulateSensors,
};
