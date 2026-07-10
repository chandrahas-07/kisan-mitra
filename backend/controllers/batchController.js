
const { getAllBatches: fetchBatchesFromService } = require("../services/batchService");

async function getAllBatches(req, res) {
  try {
    // 2. Use the renamed service function here
    const batches = await fetchBatchesFromService();

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
