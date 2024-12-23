export default function AboutUsForeword() {
    const stats = [
      { value: "50+", label: "Kota", desc: "Jaringan transportasi yang luas" },
      { value: "100+", label: "Bus", desc: "Armada ramah lingkungan" },
      { value: "10K+", label: "Penumpang", desc: "Kepercayaan masyarakat" },
      { value: "0", label: "Emisi", desc: "Komitmen lingkungan" }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-violet-900 leading-tight">
                Menuju Masa Depan
                <span className="relative">
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-violet-200"></span>
                  Berkelanjutan
                </span>
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed">
                Pada tahun 2024, EcoNova hadir sebagai pionir transportasi ramah lingkungan.
                Platform kami menghubungkan masyarakat dengan solusi transportasi modern yang
                mengutamakan keberlanjutan dan efisiensi.
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-violet-100">
                <div className="text-center">
                  <span className="text-4xl font-bold text-violet-600 group-hover:text-violet-800 transition-colors">
                    {stat.value}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">{stat.label}</h3>
                  <p className="text-gray-600 mt-2">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }