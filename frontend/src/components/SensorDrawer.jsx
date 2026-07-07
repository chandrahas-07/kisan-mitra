function SensorDrawer({ selectedBatch, onClose }) {

  if (!selectedBatch) return null;

  function getRecommendation(status) {

    if (status === "Critical") {
      return "Immediate cooling inspection required.";
    }

    if (status === "Warning") {
      return "Monitor chamber conditions closely.";
    }

    return "Storage conditions are stable.";
  }

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">

      <div className="w-full max-w-md bg-gray-950 border-l border-gray-800 h-full p-8 overflow-y-auto">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Batch Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>

        <div className="mt-10 space-y-6">

          <div>

            <p className="text-gray-400">
              Batch ID
            </p>

            <p className="text-2xl font-semibold text-white mt-1">
              {selectedBatch.id}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Crop Type
            </p>

            <p className="text-2xl font-semibold text-white mt-1">
              {selectedBatch.crop}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-gray-900 rounded-xl p-4">

              <p className="text-gray-400 text-sm">
                Temperature
              </p>

              <p className="text-3xl font-bold text-green-400 mt-2">
                {selectedBatch.temperature} °C
              </p>

            </div>

            <div className="bg-gray-900 rounded-xl p-4">

              <p className="text-gray-400 text-sm">
                Humidity
              </p>

              <p className="text-3xl font-bold text-blue-400 mt-2">
                {selectedBatch.humidity}%
              </p>

            </div>

          </div>

          <div>

            <p className="text-gray-400">
              Operational Status
            </p>

            <p
              className={`mt-2 text-xl font-semibold
              ${
                selectedBatch.status === "Critical"
                  ? "text-red-400"
                  : selectedBatch.status === "Warning"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {selectedBatch.status}
            </p>

          </div>

          <div className="bg-gray-900 rounded-xl p-5">

            <p className="text-gray-400">
              Recommendation
            </p>

            <p className="mt-3 text-white leading-relaxed">
              {getRecommendation(selectedBatch.status)}
            </p>

          </div>

          <div className="bg-gray-900 rounded-xl p-5">

            <p className="text-gray-400">
              Risk Analysis
            </p>

            <p className="mt-3 text-white leading-relaxed">
              Continuous environmental drift detected.
              Monitoring algorithms recommend periodic
              airflow inspection and compressor verification.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SensorDrawer;