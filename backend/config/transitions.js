const { STATUS } = require("./status");
const { EVENT_TYPES } = require("./eventTypes");
const { RECOMMENDATIONS } = require("./recommendations");

const TRANSITIONS = {

  [`${STATUS.HEALTHY}->${STATUS.WARNING}`]: {

    eventType: EVENT_TYPES.TEMPERATURE_WARNING,

    recommendation:
      RECOMMENDATIONS.TEMPERATURE_WARNING,

  },

  [`${STATUS.WARNING}->${STATUS.CRITICAL}`]: {

    eventType: EVENT_TYPES.TEMPERATURE_CRITICAL,

    recommendation:
      RECOMMENDATIONS.TEMPERATURE_CRITICAL,

  },

  [`${STATUS.CRITICAL}->${STATUS.WARNING}`]: {

    eventType: EVENT_TYPES.TEMPERATURE_RECOVERING,

    recommendation:
      RECOMMENDATIONS.TEMPERATURE_RECOVERING,

  },

  [`${STATUS.WARNING}->${STATUS.HEALTHY}`]: {

    eventType: EVENT_TYPES.TEMPERATURE_NORMAL,

    recommendation:
      RECOMMENDATIONS.TEMPERATURE_NORMAL,

  },

  // Direct jump

  [`${STATUS.HEALTHY}->${STATUS.CRITICAL}`]: {

    eventType: EVENT_TYPES.TEMPERATURE_CRITICAL,

    recommendation:
      RECOMMENDATIONS.TEMPERATURE_CRITICAL,

  },

  // Direct recovery

  [`${STATUS.CRITICAL}->${STATUS.HEALTHY}`]: {

    eventType: EVENT_TYPES.TEMPERATURE_NORMAL,

    recommendation:
      RECOMMENDATIONS.TEMPERATURE_NORMAL,

  },

};

module.exports = {
  TRANSITIONS,
};