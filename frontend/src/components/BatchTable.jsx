import { useEffect, useState } from "react";

import { fetchBatches } from "../services/api";

import SensorDrawer from "./SensorDrawer";

function BatchTable() {

  const [batches, setBatches] = useState([]);

  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {

    async function loadBatches() {

      const data = await fetchBatches();

      setBatches(data);
    }

    loadBatches();

    const interval = setInterval(loadBatches, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">
          Live Crop Batches
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-left text-white">

          <thead className="bg-gray-800">

            <tr>
              <th className="p-4">Batch ID</th>
              <th className="p-4">Crop</th>
              <th className="p-4">Temperature</th>
              <th className="p-4">Humidity</th>
              <th className="p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {batches.map((batch, index) => (

              <tr
                key={index}
                onClick={() => setSelectedBatch(batch)}
                className="border-b border-gray-800 hover:bg-gray-800 transition"
              >

                <td className="p-4">{batch.id}</td>

                <td className="p-4">{batch.crop}</td>

                <td className="p-4">{batch.temperature} °C</td>

                <td className="p-4">{batch.humidity}%</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      batch.status === "Healthy"
                        ? "bg-green-500/20 text-green-400"
                        : batch.status === "Warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {batch.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <SensorDrawer
  selectedBatch={selectedBatch}
  onClose={() => setSelectedBatch(null)}
/>

      </div>

    </div>
  );
}

export default BatchTable;