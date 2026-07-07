export function generateSensorData() {

  const crops = ["Onion", "Potato", "Chili", "Tomato"];

  const statuses = ["Healthy", "Warning", "Critical"];

  return Array.from({ length: 6 }, (_, index) => ({

    id: `BATCH-${index + 1}`,

    crop: crops[Math.floor(Math.random() * crops.length)],

    temperature: (Math.random() * 8 + 1).toFixed(1),

    humidity: Math.floor(Math.random() * 20) + 70,

    status: statuses[Math.floor(Math.random() * statuses.length)],

  }));
}