export default function AboutUsProducts() {
    const products = [
      {
        title: "Regular Bus",
        description: "Kenyamanan perjalanan dengan teknologi ramah lingkungan",
        image: "EcoNova.jpg"
      },
      {
        title: "Sleeper Bus",
        description: "Perjalanan jarak jauh dengan kenyamanan maksimal",
        image: "EcoNova.jpg"
      }
    ];
  
    return (
      <div className="bg-violet-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-violet-900 mb-16">
            Produk Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-5xl font-bold mb-2">{product.title}</h3>
                  <p className="text-black text-4xl" >{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }