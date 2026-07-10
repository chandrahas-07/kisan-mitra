const { STATUS } = require("../config/status");

const { TRANSITIONS } =
require("../config/transitions");

const { createEvent } =
require("../services/eventService");

function calculateStatus(temperature) {

  if (temperature > 8)
    return STATUS.CRITICAL;

  if (temperature > 6)
    return STATUS.WARNING;

  return STATUS.HEALTHY;
}

async function processBatch(batch) {

  const previousStatus = batch.status;

  const currentStatus =
    calculateStatus(batch.temperature);

  if (previousStatus === currentStatus) {

    return currentStatus;

  }

  const key =
`${previousStatus}->${currentStatus}`;

  const transition =
    TRANSITIONS[key];

  batch.status = currentStatus;

  if (!transition) {

    return currentStatus;

  }

  await createEvent({

    eventId:
`EVT-${Date.now()}-${batch.batchId}`,

    batchId: batch.batchId,

    crop: batch.crop,

    previousStatus,

    currentStatus,

    eventType:
transition.eventType,

    severity: currentStatus,

    temperature:
batch.temperature,

    humidity:
batch.humidity,

    message:
`${batch.crop} changed from ${previousStatus} to ${currentStatus}.`,

    recommendation:
transition.recommendation,

    acknowledged: false,

    createdAt:
new Date().toISOString(),

  });

  return currentStatus;

}

module.exports = {
  processBatch,
};