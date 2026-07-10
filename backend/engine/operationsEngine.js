const { STATUS } = require("../config/status");
const { EVENT_TYPES } = require("../config/eventTypes");
const { RECOMMENDATIONS } = require("../config/recommendations");

const { createEvent } = require("../services/eventService");

const {
  processAlert,
} = require("./alertEngine");

function calculateStatus(temperature) {

  if (temperature > 8) {
    return STATUS.CRITICAL;
  }

  if (temperature > 6) {
    return STATUS.WARNING;
  }

  return STATUS.HEALTHY;
}

function buildTransition(previousStatus, currentStatus) {

  if (
    previousStatus === STATUS.HEALTHY &&
    currentStatus === STATUS.WARNING
  ) {

    return {
      eventType: EVENT_TYPES.TEMPERATURE_WARNING,
      recommendation:
        RECOMMENDATIONS.TEMPERATURE_WARNING,
    };

  }

  if (
    previousStatus === STATUS.WARNING &&
    currentStatus === STATUS.CRITICAL
  ) {

    return {
      eventType: EVENT_TYPES.TEMPERATURE_CRITICAL,
      recommendation:
        RECOMMENDATIONS.TEMPERATURE_CRITICAL,
    };

  }

  if (
    previousStatus === STATUS.CRITICAL &&
    currentStatus === STATUS.WARNING
  ) {

    return {
      eventType: EVENT_TYPES.TEMPERATURE_RECOVERING,
      recommendation:
        RECOMMENDATIONS.TEMPERATURE_RECOVERING,
    };

  }

  if (
    previousStatus === STATUS.WARNING &&
    currentStatus === STATUS.HEALTHY
  ) {

    return {
      eventType: EVENT_TYPES.TEMPERATURE_NORMAL,
      recommendation:
        RECOMMENDATIONS.TEMPERATURE_NORMAL,
    };

  }

  return null;
}

async function processBatch(batch) {

  const previousStatus = batch.status;

  const currentStatus = calculateStatus(
    batch.temperature
  );

  if (previousStatus === currentStatus) {

    return currentStatus;

  }

  const transition = buildTransition(
    previousStatus,
    currentStatus
  );

  batch.status = currentStatus;

  if (transition) {

    const event = await createEvent({

       // await processAlert(event);
      eventId: `EVT-${Date.now()}-${batch.batchId}`,
      batchId: batch.batchId,
      crop: batch.crop,
      severity: currentStatus,
      eventType: transition.eventType,
      message: `${batch.crop} changed from ${previousStatus} to ${currentStatus}.`,
      recommendation: transition.recommendation,
      acknowledged: false,
      createdAt: new Date().toISOString(),
    });

    await processAlert(event);

  }

  return currentStatus;
}

module.exports = {
  processBatch,
};