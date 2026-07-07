const events = [];

function addEvent(message, severity = "INFO") {

  events.unshift({
    id: Date.now(),
    message,
    severity,
    timestamp: new Date().toLocaleTimeString(),
  });

  if (events.length > 20) {
    events.pop();
  }
}

function getEvents() {
  return events;
}

module.exports = {
  addEvent,
  getEvents,
};