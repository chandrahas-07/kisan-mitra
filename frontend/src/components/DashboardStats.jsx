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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
  {
    title: "📦 Total Batches",
    value: currentStats.totalBatches ?? 0,
    color: "text-blue-600 dark:text-blue-400",
  },

  {
    title: "🟢 Healthy",
    value: currentStats.healthy ?? 0,
    color: "text-green-600 dark:text-green-400",
  },

  {
    title: "🟡 Warning",
    value: currentStats.warning ?? 0,
    color: "text-yellow-600 dark:text-yellow-400",
  },

  {
    title: "🔴 Critical",
    value: currentStats.critical ?? 0,
    color: "text-red-600 dark:text-red-400",
  },

  {
    title: "🌡 Avg Temperature",
    value: `${currentStats.averageTemperature ?? 0} °C`,
    color: "text-orange-600 dark:text-orange-400",
  },

  {
    title: "💧 Avg Humidity",
    value: `${currentStats.averageHumidity ?? 0}%`,
    color: "text-cyan-600 dark:text-cyan-400",
  },
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
          <p className={`mt-4 text-4xl font-bold ${stat.color}`}>
    {stat.value}
</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
