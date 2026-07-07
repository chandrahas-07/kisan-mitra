import { useEffect, useState } from "react";

import { fetchStats } from "../services/api";

function DashboardStats() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    async function loadStats() {

      try {

        setLoading(true);

        const data = await fetchStats();

        setStats(data);

        setError("");

      } catch (err) {

        setError("Failed to load stats.");

      } finally {

        setLoading(false);
      }
    }

    loadStats();

    const interval = setInterval(loadStats, 5000);

    return () => clearInterval(interval);

  }, []);

  if (loading && !stats) {
    return <p className="text-white">Loading stats...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  const statsArray = [
    {
      title: "Total Batches",
      value: stats.totalBatches,
    },
    {
      title: "Critical Alerts",
      value: stats.criticalAlerts,
    },
    {
      title: "Avg Humidity",
      value: stats.avgHumidity,
    },
    {
      title: "Sensor Health",
      value: stats.sensorHealth,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {statsArray.map((stat, index) => (

        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >

          <h3 className="text-gray-400 text-lg">
            {stat.title}
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            {stat.value}
          </p>

        </div>

      ))}

    </div>
  );
}

export default DashboardStats;