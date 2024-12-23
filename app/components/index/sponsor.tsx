import { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  websiteUrl: string;
}

const sponsorsData: Sponsor[] = [
  {
    id: 1,
    name: "TechNova Solutions",
    logo: "https://via.placeholder.com/150?text=Logo+1",
    description: "Inovator terdepan dalam solusi teknologi enterprise",
    websiteUrl: "https://technova.example.com"
  },
  {
    id: 2,
    name: "GlobalInnovate",
    logo: "https://via.placeholder.com/150?text=Logo+2",
    description: "Mendorong inovasi global melalui teknologi canggih",
    websiteUrl: "https://globalinnovate.example.com"
  },
  {
    id: 3,
    name: "CodeCraft Systems",
    logo: "https://via.placeholder.com/150?text=Logo+3",
    description: "Ahli dalam pengembangan perangkat lunak kustom",
    websiteUrl: "https://codecraft.example.com"
  },
  {
    id: 4,
    name: "DataPulse Analytics",
    logo: "https://via.placeholder.com/150?text=Logo+4",
    description: "Transformasi data menjadi wawasan strategis",
    websiteUrl: "https://datapulse.example.com"
  }
];

export const meta: MetaFunction = () => {
  return [
    { title: "Sponsor Kami | Inovasi Bersama" },
    { 
      name: "description", 
      content: "Terima kasih kepada para sponsor yang telah mendukung misi kami" 
    }
  ];
};

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-gray-800"
        >
          We Are Collaborate With
        </motion.h1>

        <div className="flex overflow-x-auto space-x-6 pb-8 px-4">
          {sponsorsData.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-72 bg-white shadow-lg rounded-xl overflow-hidden 
                transform transition-all duration-300 ease-in-out
                hover:shadow-xl border-2 border-transparent 
                hover:border-violet-500 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  className="mb-4 w-36 h-36 object-contain" 
                />
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {sponsor.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {sponsor.description}
                </p>
                <a 
                  href={sponsor.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-violet-500 text-white rounded-md 
                    hover:bg-violet-600 transition-colors duration-300"
                >
                  Kunjungi Website
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12 bg-white shadow-md rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Tertarik berkolaborasi dengan kami?
          </h2>
          <p className="text-gray-600 mb-6">
            Bergabunglah dengan kami dan ciptakan inovasi bersama!
          </p>
          <a 
            href="/contact" 
            className="px-6 py-3 bg-violet-500 text-white text-lg 
              rounded-full hover:bg-violet-600 transition-colors 
              duration-300 inline-block"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}