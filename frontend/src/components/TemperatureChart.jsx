import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TemperatureChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    function updateChart() {

      const newPoint = {
        time: new Date().toLocaleTimeString(),
        temperature: Number((Math.random() * 4 + 4).toFixed(1)),
      };

      setData((prev) => {

        const updated = [...prev, newPoint];

        if (updated.length > 10) {
          updated.shift();
        }

        return updated;
      });
    }

    updateChart();

    const interval = setInterval(updateChart, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="mt-10 bg-white
dark:bg-gray-900
border
border-gray-200
dark:border-gray-800 rounded-2xl p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Temperature Trend
        </h2>

        <p className="mt-2 text-gray-400">
          Real-time temperature evolution across monitored storage zones.
        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
            />

            <YAxis
              stroke="#9CA3AF"
              domain={[0, 12]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TemperatureChart;