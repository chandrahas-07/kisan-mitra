function Stats() {

  const stats = [
    {
      title: "Active Batches",
      value: Math.floor(Math.random() * 50) + 50,
    },
    {
      title: "Avg Temperature",
      value: `${(Math.random() * 5 + 2).toFixed(1)} °C`,
    },
    {
      title: "Alerts Generated",
      value: Math.floor(Math.random() * 20),
    },
    {
      title: "Healthy Storage",
      value: `${Math.floor(Math.random() * 10) + 90}%`,
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Live Storage Insights
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Real-time operational metrics from monitored cold storage facilities.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-green-500 transition"
            >

              <h3 className="text-gray-400 text-lg">
                {stat.title}
              </h3>

              <p className="mt-4 text-4xl font-bold text-green-400">
                {stat.value}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;