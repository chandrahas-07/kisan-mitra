require("dotenv").config();

const express = require("express");
const cors = require("cors");

const batchRoutes = require("./routes/batches");
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const statsRoutes = require("./routes/stats");
const uploadRoutes = require("./routes/upload");

const { getEvents } = require("./data/eventStore");
const {
  simulateSensors,
} = require("./simulator/sensorSimulator");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Kisan Mitra Backend Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/events", (req, res) => {
  res.json(getEvents());
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Sensor Simulator
setInterval(async () => {
  try {
    await simulateSensors();
  } catch (error) {
    console.error("Simulator Error:", error);
  }
}, 10000);