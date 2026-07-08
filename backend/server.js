require("dotenv").config();

const { getEvents } = require("./data/eventStore");

const batchRoutes = require("./routes/batches");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;




function generateStats() {

  return {
    totalBatches: Math.floor(Math.random() * 50) + 50,
    criticalAlerts: Math.floor(Math.random() * 10),
    avgHumidity: `${Math.floor(Math.random() * 20) + 70}%`,
    sensorHealth: `${Math.floor(Math.random() * 5) + 95}%`,
  };
}

function generateAlerts() {

  const crops = ["Onion", "Potato", "Chili", "Tomato"];

  const recommendations = [
    "Inspect cooling unit immediately.",
    "Check chamber airflow.",
    "Verify compressor health.",
    "Inspect storage door sealing.",
  ];

  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    crop: crops[Math.floor(Math.random() * crops.length)],
    type: Math.random() > 0.5 ? "Critical" : "Warning",
    temperature: (Math.random() * 8 + 2).toFixed(1),
    recommendation:
      recommendations[
        Math.floor(Math.random() * recommendations.length)
      ],
    timestamp: new Date().toLocaleTimeString(),
  }));
}

app.get("/", (req, res) => {
  res.json({
    message: "Kisan Mitra Backend Running",
  });
});

app.use("/api/batches", batchRoutes);

app.get("/api/stats", (req, res) => {
  res.json(generateStats());
});

app.get("/api/alerts", (req, res) => {
  res.json(generateAlerts());
});

app.get("/api/events", (req, res) => {
  res.json(getEvents());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});