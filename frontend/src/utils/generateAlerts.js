export function generateAlerts() {

  const crops = ["Onion", "Potato", "Chili", "Tomato"];

  const recommendations = [
    "Inspect cooling unit immediately.",
    "Check chamber airflow.",
    "Verify compressor health.",
    "Inspect storage door sealing.",
    "Reduce chamber loading density.",
  ];

  const alertTypes = ["Warning", "Critical"];

  return Array.from({ length: 4 }, (_, index) => ({

    id: index + 1,

    crop: crops[Math.floor(Math.random() * crops.length)],

    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],

    temperature: (Math.random() * 8 + 2).toFixed(1),

    recommendation:
      recommendations[
        Math.floor(Math.random() * recommendations.length)
      ],

    timestamp: new Date().toLocaleTimeString(),

  }));
}