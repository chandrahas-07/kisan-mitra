const crops = ["Onion", "Potato", "Chili", "Tomato"];

const statuses = ["Healthy", "Warning", "Critical"];

const batches = Array.from({ length: 6 }, (_, index) => ({

  id: `BATCH-${index + 1}`,

  crop: crops[Math.floor(Math.random() * crops.length)],

  temperature: Number((Math.random() * 4 + 2).toFixed(1)),

  humidity: Math.floor(Math.random() * 10) + 75,

  status: "Healthy",

}));

function evolveBatch(batch) {

  const tempChange = (Math.random() - 0.5) * 0.8;

  const humidityChange = Math.floor((Math.random() - 0.5) * 4);

  batch.temperature = Number(
    Math.max(1, Math.min(12, batch.temperature + tempChange)).toFixed(1)
  );

  batch.humidity = Math.max(
    65,
    Math.min(95, batch.humidity + humidityChange)
  );

  if (batch.temperature > 8) {

    batch.status = "Critical";

  } else if (batch.temperature > 6) {

    batch.status = "Warning";

  } else {

    batch.status = "Healthy";
  }

  return batch;
}

function getBatches() {

  return batches.map((batch) => evolveBatch(batch));
}

module.exports = {
  getBatches,
};