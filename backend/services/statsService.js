const { getAllBatches } = require("./batchService");
const { STATUS } = require("../config/status");

async function getDashboardStats() {

  const batches = await getAllBatches();

  const totalBatches = batches.length;

  let healthy = 0;
  let warning = 0;
  let critical = 0;

  let totalTemperature = 0;
  let totalHumidity = 0;

  for (const batch of batches) {

    totalTemperature += batch.temperature;
    totalHumidity += batch.humidity;

    switch (batch.status) {

      case STATUS.HEALTHY:
        healthy++;
        break;

      case STATUS.WARNING:
        warning++;
        break;

      case STATUS.CRITICAL:
        critical++;
        break;

    }

  }

  return {

    totalBatches,

    healthy,

    warning,

    critical,

    averageTemperature:
      totalBatches === 0
        ? 0
        : Number((totalTemperature / totalBatches).toFixed(1)),

    averageHumidity:
      totalBatches === 0
        ? 0
        : Number((totalHumidity / totalBatches).toFixed(1)),

  };

}

module.exports = {
  getDashboardStats,
};