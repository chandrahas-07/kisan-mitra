const { getCropBatches } = require("../services/dynamoService");

async function getAllBatches(req, res) {
  try {
    const batches = await getCropBatches();

    res.json(batches);
  } catch (error) {
    console.error("Error fetching crop batches:", error);

    res.status(500).json({
      message: "Failed to fetch crop batches.",
    });
  }
}

module.exports = {
  getAllBatches,
};