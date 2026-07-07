import { useEffect, useState } from "react";

import { fetchAlerts } from "../services/api";

function AlertPanel() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    async function loadAlerts() {

      const data = await fetchAlerts();

      setAlerts(data);
    }

    loadAlerts();

    const interval = setInterval(loadAlerts, 7000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

      <div className="p-6 border-b border-gray-800">

        <h2 className="text-2xl font-bold text-white">
          Live Alerts
        </h2>

      </div>

      <div className="divide-y divide-gray-800">

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className="p-6 hover:bg-gray-800 transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3
                  className={`text-lg font-semibold
                  ${
                    alert.type === "Critical"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {alert.type} Alert
                </h3>

                <p className="mt-2 text-gray-300">
                  {alert.crop} batch temperature reached{" "}
                  {alert.temperature} °C
                </p>

                <p className="mt-2 text-green-400">
                  Recommendation:
                  {" "}
                  {alert.recommendation}
                </p>

              </div>

              <div className="text-sm text-gray-500">
                {alert.timestamp}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default AlertPanel;