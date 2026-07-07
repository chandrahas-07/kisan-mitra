function Features() {
  const features = [
    {
      title: "Real-Time Monitoring",
      description:
        "Continuously monitor temperature and humidity across cold storage batches.",
    },
    {
      title: "Intelligent Alerts",
      description:
        "Receive prescriptive recommendations before spoilage occurs.",
    },
    {
      title: "Cloud-Native Platform",
      description:
        "Built using AWS serverless architecture for scalability and reliability.",
    },
  ];

  return (
    <section className="bg-gray-950 text-white py-24 px-6">
      
      <div className="max-w-6xl mx-auto">

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Kisan Mitra?
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Modern cold storage intelligence powered by cloud computing and IoT.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500 transition"
            >
              <h3 className="text-2xl font-semibold text-green-400">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;