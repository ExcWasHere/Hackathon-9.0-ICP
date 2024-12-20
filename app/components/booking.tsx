import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Groq } from "groq-sdk";
import { MapPin, Calendar, Bus, Clock, Utensils, Ticket } from "lucide-react";

interface Location {
  city: string;
  province: string;
}

interface Recommendation {
  entertainment: Array<{
    name: string;
    description: string;
    rating: number;
  }>;
  dining: Array<{
    name: string;
    cuisine: string;
    rating: number;
    priceRange: string;
  }>;
  meetings: Array<{
    name: string;
    type: string;
    capacity: string;
  }>;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const destination = formData.get("destination") as string;
  
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const prompt = `Generate recommendations for ${destination} including:
    - 3 popular entertainment venues or tourist attractions
    - 3 well-known restaurants or food spots
    - 2 business meeting venues
    Format as JSON matching the Recommendation interface.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "mixtral-8x7b-32768",
  });

  return JSON.parse(completion.choices[0]?.message?.content || "{}");
};

export default function Booking() {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [busType, setBusType] = useState<"regular" | "sleeper">("regular");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
      });
      
      const data = await response.json();
      setRecommendations(data);
      setShowRecommendations(true);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Book Your <span className="text-violet-600">E-Bus Journey</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              {/* From Location */}
              <div className="space-y-2">
                <label className="flex items-center text-lg font-medium text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-violet-500" />
                  From Location
                </label>
                <input
                  type="text"
                  name="fromLocation"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200"
                  placeholder="Enter departure city"
                  required
                />
              </div>

              {/* To Location */}
              <div className="space-y-2">
                <label className="flex items-center text-lg font-medium text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-violet-500" />
                  To Location
                </label>
                <input
                  type="text"
                  name="toLocation"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200"
                  placeholder="Enter destination city"
                  required
                />
              </div>

              {/* Bus Type Selection */}
              <div className="space-y-4">
                <label className="flex items-center text-lg font-medium text-gray-700">
                  <Bus className="w-5 h-5 mr-2 text-violet-500" />
                  Select Bus Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setBusType("regular")}
                    className={`p-4 rounded-xl border-2 transition duration-200 ${
                      busType === "regular"
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:border-violet-200"
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-1">Regular E-Bus</h3>
                    <p className="text-sm text-gray-600">
                      Intercity travel with comfort
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBusType("sleeper")}
                    className={`p-4 rounded-xl border-2 transition duration-200 ${
                      busType === "sleeper"
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:border-violet-200"
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-1">Sleeper E-Bus</h3>
                    <p className="text-sm text-gray-600">
                      Interstate & tourism with premium comfort
                    </p>
                  </button>
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-lg font-medium text-gray-700">
                    <Calendar className="w-5 h-5 mr-2 text-violet-500" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-lg font-medium text-gray-700">
                    <Clock className="w-5 h-5 mr-2 text-violet-500" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-violet-700 transition duration-200 flex items-center justify-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                Book Now
              </button>
            </div>
          </form>

          {/* Recommendations Section */}
          {showRecommendations && recommendations && (
            <div className="mt-12 space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-center mb-8">
                Recommended for Your Trip to {toLocation}
              </h2>

              {/* Entertainment Recommendations */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                    🎭
                  </span>
                  Entertainment & Attractions
                </h3>
                <div className="grid gap-4">
                  {recommendations.entertainment.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                    >
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="mt-2 flex items-center">
                        {"⭐".repeat(item.rating)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dining Recommendations */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Utensils className="w-6 h-6 mr-3 text-violet-500" />
                  Popular Dining Spots
                </h3>
                <div className="grid gap-4">
                  {recommendations.dining.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                    >
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600">{item.cuisine}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span>{"⭐".repeat(item.rating)}</span>
                        <span className="text-gray-500">{item.priceRange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meeting Venues */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                    🏢
                  </span>
                  Business Meeting Venues
                </h3>
                <div className="grid gap-4">
                  {recommendations.meetings.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                    >
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600">{item.type}</p>
                      <p className="text-sm text-gray-500">
                        Capacity: {item.capacity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}