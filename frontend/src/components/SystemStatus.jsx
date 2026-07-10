import { useEffect, useState } from "react";
import { fetchBatches } from "../services/api";

function SystemStatus() {
  const [summary, setSummary] = useState({
    total: 0,
    healthy: 0,
    warning: 0,
    critical: 0,
  });

  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    async function loadSummary() {
      try {
        const batches = await fetchBatches();

        const healthy = batches.filter(
          (batch) => batch.status === "Healthy"
        ).length;

        const warning = batches.filter(
          (batch) => batch.status === "Warning"
        ).length;

        const critical = batches.filter(
          (batch) => batch.status === "Critical"
        ).length;

        setSummary({
          total: batches.length,
          healthy,
          warning,
          critical,
        });

        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Failed to load system summary:", error);
      }
    }

    loadSummary();

    const interval = setInterval(loadSummary, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">

            <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></span>

            🌾 Cold Storage Operations

          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Monitoring crop storage conditions across all active batches.
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Last Updated: {lastUpdated || "--"}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-4">

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-5 py-3 min-w-[120px]">
            <p className="text-sm text-blue-300">
              📦 Total
            </p>

            <p className="text-2xl font-bold text-blue-400">
              {summary.total}
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 min-w-[120px]">
            <p className="text-sm text-green-300">
              🟢 Healthy
            </p>

            <p className="text-2xl font-bold text-green-400">
              {summary.healthy}
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-5 py-3 min-w-[120px]">
            <p className="text-sm text-yellow-300">
              🟡 Warning
            </p>

            <p className="text-2xl font-bold text-yellow-400">
              {summary.warning}
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 min-w-[120px]">
            <p className="text-sm text-red-300">
              🔴 Critical
            </p>

            <p className="text-2xl font-bold text-red-400">
              {summary.critical}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SystemStatus;