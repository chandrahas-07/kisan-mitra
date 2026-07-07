import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import SkeletonCard from "./SkeletonCard";

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
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  // Safe fallback fallback if stats is still null
  const currentStats = stats || {};

  const statsArray = [
    { title: "Total Batches", value: currentStats.totalBatches ?? 0 },
    { title: "Critical Alerts", value: currentStats.criticalAlerts ?? 0 },
    { title: "Avg Humidity", value: currentStats.avgHumidity ?? "0%" },
    { title: "Sensor Health", value: currentStats.sensorHealth ?? "100%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsArray.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg"
        >
          <h3 className="text-gray-600 dark:text-gray-400">
            {stat.title}
          </h3>
          <p className="mt-4 text-4xl font-bold text-green-600 dark:text-green-400">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
