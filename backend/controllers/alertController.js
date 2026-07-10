const { getAllAlerts } = require("../services/alertService");

async function getAlerts(req, res) {
  try {
    const alerts = await getAllAlerts();
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch alerts.",
    });
  }
}

module.exports = {
  getAlerts,
};