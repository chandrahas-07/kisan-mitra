const { createAlert } = require("../services/alertService");
const { STATUS } = require("../config/status");
const { sendCriticalAlert } = require("../services/snsService");

async function processAlert(event) {

  if (!event) {
    return;
  }

  // Do not create alerts for healthy events
  if (event.severity === STATUS.HEALTHY) {
    return;
  }

  const priority =
    event.severity === STATUS.CRITICAL
      ? "HIGH"
      : "MEDIUM";

  const alert = {
    alertId: `ALT-${Date.now()}`,
    eventId: event.eventId,
    batchId: event.batchId,
    crop: event.crop,
    priority,
    title:
      priority === "HIGH"
        ? "Critical Storage Condition"
        : "Storage Warning",
    message: event.message,
    recommendation: event.recommendation,
    status: "OPEN",
    acknowledged: false,
    createdAt: new Date().toISOString(),
  };

  await createAlert(alert);

  await sendCriticalAlert(alert);
}

module.exports = {
  processAlert,
};