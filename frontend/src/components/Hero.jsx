function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-6">
      
      <div className="max-w-4xl text-center">

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Smart Cold Storage
          <span className="text-green-400"> Monitoring</span>
        </h1>

        <p className="mt-8 text-lg md:text-2xl text-gray-300">
          Real-time crop monitoring and intelligent alerts
          to reduce post-harvest spoilage.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

          <button className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-xl text-lg font-semibold">
            Get Started
          </button>

          <button className="border border-gray-500 hover:border-white transition px-8 py-4 rounded-xl text-lg">
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;