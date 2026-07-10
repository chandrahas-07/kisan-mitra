import { useEffect, useState } from "react";
import { fetchBatches } from "../services/api";
import SensorDrawer from "./SensorDrawer";

function BatchTable() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBatches() {
      try {
        const data = await fetchBatches();
        setBatches(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load crop batches.");
      } finally {
        setLoading(false);
      }
    }

    loadBatches();

    const interval = setInterval(loadBatches, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Healthy":
        return "bg-green-500/20 text-green-400";

      case "Warning":
        return "bg-yellow-500/20 text-yellow-400";

      case "Critical":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">

        <div>
          <h2 className="text-2xl font-bold text-white">
            🌾 Live Crop Batches
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Updated every 5 seconds
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-green-400 text-sm font-semibold">
            LIVE
          </span>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="p-10 text-center text-gray-400">
          Loading crop batches...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="p-10 text-center text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">

          <table className="w-full text-left text-white">

            <thead className="bg-gray-800 text-gray-300 uppercase text-sm tracking-wide">

              <tr>
                <th className="p-4">Batch ID</th>
                <th className="p-4">Crop</th>
                <th className="p-4">Temperature</th>
                <th className="p-4">Humidity</th>
                <th className="p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {batches.length === 0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-12 text-gray-400"
                  >
                    No crop batches are currently available.
                  </td>
                </tr>

              ) : (

                batches.map((batch) => (

                  <tr
                    key={batch.batchId || batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className="
                      border-b
                      border-gray-800
                      hover:bg-gray-800
                      hover:cursor-pointer
                      transition-all
                      duration-300
                    "
                  >

                    <td className="p-4 font-medium">
                      {batch.batchId || batch.id}
                    </td>

                    <td className="p-4">
                      {batch.crop}
                    </td>

                    <td className="p-4">
                      🌡 {batch.temperature}°C
                    </td>

                    <td className="p-4">
                      💧 {batch.humidity}%
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          batch.status
                        )}`}
                      >
                        {batch.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      )}

      <SensorDrawer
        selectedBatch={selectedBatch}
        onClose={() => setSelectedBatch(null)}
      />

    </div>
  );
}

export default BatchTable;