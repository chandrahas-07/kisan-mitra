const { createEvent } = require("../services/eventService");

async function analyzeBatch(batch) {

  if (batch.temperature > 8) {

    await createEvent({
      eventId: `EVT-${Date.now()}`,
      batchId: batch.batchId,
      crop: batch.crop,
      severity: "CRITICAL",
      eventType: "TEMPERATURE_HIGH",
      message: `Temperature reached ${batch.temperature}°C.`,
      recommendation:
        "Inspect refrigeration unit immediately.",
      acknowledged: false,
      createdAt: new Date().toISOString(),
    });

    return;
  }

  if (batch.temperature > 6) {

    await createEvent({
      eventId: `EVT-${Date.now()}`,
      batchId: batch.batchId,
      crop: batch.crop,
      severity: "WARNING",
      eventType: "TEMPERATURE_WARNING",
      message: `Temperature reached ${batch.temperature}°C.`,
      recommendation:
        "Increase monitoring frequency.",
      acknowledged: false,
      createdAt: new Date().toISOString(),
    });

  }

}

module.exports = {
  analyzeBatch,
};