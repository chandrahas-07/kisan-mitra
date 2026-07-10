import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RecentActivity() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch(`${BASE_URL}/api/events`);
        const data = await response.json();

        const latest = data
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 8);

        setEvents(latest);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();

    const interval = setInterval(loadEvents, 5000);

    return () => clearInterval(interval);
  }, []);

  function getIcon(status) {
    switch (status) {
      case "Healthy":
        return "🟢";
      case "Warning":
        return "🟡";
      case "Critical":
        return "🔴";
      default:
        return "⚪";
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg">

      <div className="p-6 border-b border-gray-800">

        <h2 className="text-2xl font-bold text-white">
          📜 Recent Activity
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Latest operational events
        </p>

      </div>

      {loading ? (

        <div className="p-8 text-center text-gray-400">
          Loading activity...
        </div>

      ) : events.length === 0 ? (

        <div className="p-8 text-center text-gray-400">
          No recent activity.
        </div>

      ) : (

        <div className="divide-y divide-gray-800">

          {events.map((event) => (

            <div
              key={event.eventId}
              className="p-5 hover:bg-gray-800 transition-all duration-300"
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-white font-semibold">

                    {getIcon(event.currentStatus)}

                    {" "}

                    {event.message}

                  </p>

                  <p className="mt-2 text-green-400 text-sm">

                    💡 {event.recommendation}

                  </p>

                </div>

                <div className="text-xs text-gray-500 whitespace-nowrap">

                  {new Date(event.createdAt).toLocaleTimeString()}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentActivity;