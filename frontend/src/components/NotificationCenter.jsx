import { useEffect, useRef, useState } from "react";

function NotificationCenter() {

  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    async function loadNotifications() {

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/events`
      );

      const data = await response.json();

      setNotifications(data.slice(0, 5));
    }

    loadNotifications();

    const interval = setInterval(loadNotifications, 5000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (

    <div className="relative" ref={dropdownRef}>

      <button
        onClick={() => setOpen(!open)}
        className="relative bg-gray-900 border border-gray-800 p-3 rounded-xl hover:border-green-500 transition"
      >

        <span className="text-xl text-white">
          🔔
        </span>

        {notifications.length > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {notifications.length}
          </span>

        )}

      </button>

      {open && (

        <div className="absolute right-0 mt-4 w-[350px] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">

          <div className="p-5 border-b border-gray-800">

            <h2 className="text-xl font-bold text-white">
              Notifications
            </h2>

          </div>

          <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-800">

            {notifications.length === 0 ? (

              <div className="p-5 text-gray-400">
                No active notifications.
              </div>

            ) : (

              notifications.map((notification) => (

                <div
                  key={notification.id}
                  className="p-5 hover:bg-gray-900 transition"
                >

                  <div className="flex items-center justify-between">

                    <p
                      className={`font-semibold
                      ${
                        notification.severity === "CRITICAL"
                          ? "text-red-400"
                          : notification.severity === "WARNING"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {notification.severity}
                    </p>

                    <p className="text-xs text-gray-500">
                      {notification.timestamp}
                    </p>

                  </div>

                  <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                    {notification.message}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>

  );
}

export default NotificationCenter;