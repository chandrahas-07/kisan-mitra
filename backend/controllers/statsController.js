const {
  getDashboardStats,
} = require("../services/statsService");

async function getStats(req, res) {

  try {

    const stats = await getDashboardStats();

    res.json(stats);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics.",
    });

  }

}

module.exports = {
  getStats,
};