import { useEffect, useState } from "react";
import { fetchAlerts } from "../services/api";

function AlertPanel() {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function loadAlerts() {

      try {

        const data = await fetchAlerts();

        // Show only the latest 5 alerts
        const latestAlerts = data
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 5);

        setAlerts(latestAlerts);

        setError("");

      } catch (err) {

        console.error(err);

        setError("Failed to load alerts.");

      } finally {

        setLoading(false);

      }

    }

    loadAlerts();

    const interval = setInterval(loadAlerts, 7000);

    return () => clearInterval(interval);

  }, []);

  function getPriorityStyle(priority) {

    switch (priority) {

      case "HIGH":
        return "bg-red-500/20 text-red-400";

      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400";

      default:
        return "bg-blue-500/20 text-blue-400";

    }

  }

  return (

    <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg">

      <div className="flex items-center justify-between p-6 border-b border-gray-800">

        <div>

          <h2 className="text-2xl font-bold text-white">
            🚨 Active Operational Alerts
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Latest alerts requiring attention
          </p>

        </div>

      </div>

      {loading && (

        <div className="p-10 text-center text-gray-400">
          Loading alerts...
        </div>

      )}

      {!loading && error && (

        <div className="p-10 text-center text-red-400">
          {error}
        </div>

      )}

      {!loading && !error && (

        <div className="divide-y divide-gray-800">

          {alerts.length === 0 ? (

            <div className="p-10 text-center">

              <div className="text-5xl mb-3">
                ✅
              </div>

              <p className="text-gray-300">
                No active alerts.
              </p>

              <p className="text-gray-500 mt-2 text-sm">
                All monitored crop batches are operating normally.
              </p>

            </div>

          ) : (

            alerts.map((alert) => (

              <div
                key={alert.alertId}
                className="p-6 hover:bg-gray-800 transition-all duration-300"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityStyle(alert.priority)}`}
                    >
                      {alert.priority} PRIORITY
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-white">
                      🌾 {alert.crop}
                    </h3>

                    <p className="mt-3 text-gray-300">
                      {alert.message}
                    </p>

                    <div className="mt-4">

                      <p className="text-green-400 font-medium">
                        💡 Recommendation
                      </p>

                      <p className="text-gray-300 mt-1">
                        {alert.recommendation}
                      </p>

                    </div>

                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">

                    {new Date(alert.createdAt).toLocaleTimeString()}

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      )}

    </div>

  );

}

export default AlertPanel;