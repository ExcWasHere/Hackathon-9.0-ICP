import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";

interface FarmerReview {
  id: string;
  farmerName: string;
  serviceType: string;
  date: string;
  usageType?: string;
  content: string;
  image?: string;
  verifiedFarmer: boolean;
}

const agriEaseReviews: FarmerReview[] = [
  {
    id: "ae001",
    farmerName: "Robby Gunawan",
    serviceType: "Kenyamanan Berkendara",
    date: "18-10-2024",
    usageType: "Tidak menimbulkan polusi",
    content:
      "Biasanya bus-bus pada umumnya berbahan bakar solar atau sejenisnya, mengakibatkan asap yang keluar dari knalpot berwarna hitam pekat dan merugikan pengendara sekitar bus, saya sering kasihan pada pengendara yang terkena asap bus karna saya pernah mengalaminya.",
    image: "Passenger1.PNG",
    verifiedFarmer: true,
  },
  {
    id: "ae002",
    farmerName: "#",
    serviceType: "#",
    date: "05-11-2024",
    usageType: "#",
    content:
      "#",
    image: "#",
    verifiedFarmer: true,
  },
  {
    id: "ae003",
    farmerName: "#",
    serviceType: "#",
    date: "22-11-2024",
    usageType: "#",
    content:
      "#",
    image: "#",
    verifiedFarmer: true,
  },
  {
    id: "ae004",
    farmerName: "Wahyu Fairuz Daniswara",
    serviceType: "#",
    date: "30-11-2024",
    usageType: "#",
    content:
      "#",
    image: "#",
    verifiedFarmer: true,
  },
];

interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: LucideIcon;
}
const NavigationButton = ({
  onClick,
  disabled,
  icon: Icon,
}: NavigationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-full transition-all duration-200 
      ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow"
      } border border-gray-200`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

export default function IndexReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = agriEaseReviews[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, agriEaseReviews.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Review dari <span className="text-violet-600">Passenger Kami</span>
              </h1>
              <p className="text-lg text-gray-600">
                Pengalaman nyata dari passenger yang telah menggunakan teknologi E-Bus
                kami untuk mendukung perjalanan mereka.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {currentReview.serviceType}
                  </h3>
                  {currentReview.usageType && (
                    <p className="text-sm font-medium text-gray-500">
                      {currentReview.usageType}
                    </p>
                  )}
                </div>

                <p className="text-lg leading-relaxed text-gray-700">
                  {currentReview.content}
                </p>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {currentReview.farmerName}
                        </h3>
                        {currentReview.verifiedFarmer && (
                          <BadgeCheck className="w-5 h-5 text-violet-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {currentReview.date}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <NavigationButton
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        icon={ChevronLeft}
                      />
                      <NavigationButton
                        onClick={handleNext}
                        disabled={currentIndex === agriEaseReviews.length - 1}
                        icon={ChevronRight}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src="#"
                alt="Passenger Review"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-amber-50 to-yellow-50 blur-3xl opacity-30 rounded-full transform translate-x-8 translate-y-8" />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {agriEaseReviews.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-violet-500" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}