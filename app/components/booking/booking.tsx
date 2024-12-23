import React, { useState, useEffect } from "react";
import {
  Settings,
  LogOut,
  ChevronRight,
  Users,
  Clock,
  Bell,
  Search,
  Calendar,
  Menu,
  SettingsIcon,
  MapPin,
  Bus,
  Ticket,
  Utensils,
} from "lucide-react";
import { useNavigate } from "@remix-run/react";

const BookingPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userName = localStorage.getItem('userName');

    if (isAuthenticated !== 'true') {
      navigate("/login");
    } else {
      setName(userName || "User");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate("/home");
  };

  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    busType: "regular",
    date: "",
    time: "",
  });

  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const [activeNav, setActiveNav] = useState("Booking");

  const navigationItems = [
    { name: "Booking", icon: Ticket, path: "/booking" },
    { name: "Schedule", icon: Calendar, path: "/schedule" },
    { name: "Settings", icon: SettingsIcon, path: "/settings" },
  ];

  const calculateTicketPrice = (formData) => {
    const basePrice = formData.busType === "regular" ? 20000 : 30000;
    const distanceMultiplier = 4.0;
    return basePrice * distanceMultiplier;
  };

  const getDummyRecommendations = (destination) => {
    return {
      entertainment: [
        {
          name: "Jatim Park",
          description: "Fun places to play and entertainment, from playground, a zoo, to the history of dinosaurs are here.",
          rating: 4.5
        },
        {
          name: "Museum Angkut",
          description: "Museum Angkut is the first largest traditional to modern vehicle transportation museum in Asia.",
          rating: 4.2
        },
        {
          name: "Malang Town Square",
          description: "Modern shopping complex with various stores and food court",
          rating: 4.0
        }
      ],
      dining: [
        {
          name: "Mie Gacoan",
          cuisine: "Noodele Specialist",
          rating: 4.7,
          priceRange: "$$"
        },
        {
          name: "Kopi Studio",
          cuisine: "Coffe and Pancong cake Specialist",
          rating: 4.3,
          priceRange: "$$"
        },
        {
          name: "Nasi Goreng Permata Jingga",
          cuisine: "Fried Rice Specialist",
          rating: 4.1,
          priceRange: "$"
        }
      ],
      meetings: [
        {
          name: "Malang Creative Center",
          type: "Meeting Space",
          capacity: "30 people"
        }
      ]
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowRecommendations(false);
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const recs = getDummyRecommendations(formData.toLocation);
      const ticketPrice = calculateTicketPrice(formData);
      const bookingData = {
        id: Date.now().toString(),
        from: formData.fromLocation,
        to: formData.toLocation,
        date: formData.date,
        time: formData.time,
        busType: formData.busType,
        price: ticketPrice,
        status: "Confirmed",
        seatNumber: Math.floor(Math.random() * 40) + 1,
        estimatedDuration: "2h 30m",
      };
  
      const savedSchedule = localStorage.getItem('scheduleData');
      let scheduleData = savedSchedule ? JSON.parse(savedSchedule) : { upcoming: [], completed: [] };
      
      scheduleData.upcoming.push(bookingData);
      localStorage.setItem('scheduleData', JSON.stringify(scheduleData));

      const event = new StorageEvent('storage', {
        key: 'newBooking',
        newValue: JSON.stringify(bookingData)
      });
      window.dispatchEvent(event);
      setRecommendations({
        ...recs,
        ticketPrice
      });
      setShowRecommendations(true);
      alert('Booking successful! Check your schedule for details.');
    } catch (error) {
      setError(error.message);
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-violet-200">
      <div className="">
        <div className="bg-white/80 backdrop-blur-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8">
            {/* Mobile Menu Button */}
            <div className="md:hidden px-4 py-3 bg-white/95 border-b border-gray-100 flex items-center justify-between">
              <h1 className="text-xl font-extrabold text-white">
                Eco<span className="text-violet-800">Nova</span>
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Sidebar */}
            <div
              className={`
                col-span-12 md:col-span-2 bg-white/95 border-gray-100
                ${isMobileMenuOpen ? "block" : "hidden"} md:block
                fixed md:relative top-0 left-0 w-full md:w-auto h-full md:h-auto
                z-50 md:z-auto
              `}
            >
              <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                <div className="hidden md:flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-400">
                    Eco<span className="text-violet-800">Nova</span>
                  </h1>
                </div>
                <nav className="space-y-2 sm:space-y-4">
                  {navigationItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setActiveNav(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                        activeNav === item.name
                          ? "bg-violet-500 text-white shadow-lg shadow-violet-200"
                          : "text-gray-600 hover:bg-violet-50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-all duration-300"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-10 p-4 sm:p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-violet-800">
                  Bus Booking
                </h1>
                <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
                  <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-300">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full text-white text-xs flex items-center justify-center">
                      2
                    </span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-violet-200 flex items-center justify-center">
                      <Users size={20} className="text-violet-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-violet-800">{name}</div>
                      <div className="text-sm text-gray-500">Passenger</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold">
                        <span className="bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent">
                          Book Your Journey
                        </span>
                      </h1>
                      <p className="text-gray-500 mt-2">
                        Enter your travel details
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            From Location
                          </label>
                          <input
                            type="text"
                            name="fromLocation"
                            value={formData.fromLocation}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                            placeholder="Enter departure city..."
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            To Location
                          </label>
                          <input
                            type="text"
                            name="toLocation"
                            value={formData.toLocation}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                            placeholder="Enter destination city..."
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Bus Type
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, busType: "regular" }))}
                            className={`p-4 rounded-xl border-2 transition duration-200 ${
                              formData.busType === "regular"
                                ? "border-violet-500 bg-violet-50"
                                : "border-gray-200 hover:border-violet-200"
                            }`}
                          >
                            <h3 className="font-semibold text-lg mb-1">Regular Bus</h3>
                            <p className="text-sm text-gray-600">
                              Standard comfort for short trips
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, busType: "sleeper" }))}
                            className={`p-4 rounded-xl border-2 transition duration-200 ${
                              formData.busType === "sleeper"
                                ? "border-violet-500 bg-violet-50"
                                : "border-gray-200 hover:border-violet-200"
                            }`}
                          >
                            <h3 className="font-semibold text-lg mb-1">Sleeper Bus</h3>
                            <p className="text-sm text-gray-600">
                              Premium comfort for long journeys
                            </p>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Time
                          </label>
                          <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-violet-500 hover:bg-violet-600 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-violet-200"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Ticket className="w-5 h-5" />
                            Book Now
                          </div>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Recommendations Section */}
                {showRecommendations && recommendations && (
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 transition-transform duration-300 hover:scale-[1.02]">
                    <div className="space-y-6">
                      {/* Ticket Price */}
                      <div className="bg-violet-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-violet-800 mb-2">Ticket Price</h3>
                        <p className="text-3xl font-bold text-violet-600">
                          Rp {recommendations.ticketPrice.toLocaleString()}
                        </p>
                        <p className="text-gray-600 mt-2">
                          {formData.busType === "sleeper" ? "Sleeper Bus" : "Regular Bus"} from {formData.fromLocation} to {formData.toLocation}
                        </p>
                      </div>

                      {/* Entertainment Recommendations */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                            🎭
                          </span>
                          Entertainment & Attractions
                        </h3>
                        <div className="space-y-3">
                          {recommendations.entertainment.map((item, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                            >
                              <h4 className="font-semibold text-lg">{item.name}</h4>
                              <p className="text-gray-600">{item.description}</p>
                              <div className="mt-2 flex items-center">
                                {"⭐".repeat(Math.floor(item.rating))}
                                <span className="ml-2 text-gray-500">
                                  {item.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dining Recommendations */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Utensils className="w-6 h-6 mr-3 text-violet-500" />
                          Popular Dining Spots
                        </h3>
                        <div className="space-y-3">
                          {recommendations.dining.map((item, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                            >
                              <h4 className="font-semibold text-lg">{item.name}</h4>
                              <p className="text-gray-600">{item.cuisine}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  {"⭐".repeat(Math.floor(item.rating))}
                                  <span className="ml-2 text-gray-500">
                                    {item.rating.toFixed(1)}
                                  </span>
                                </div>
                                <span className="text-violet-600 font-medium">
                                  {item.priceRange}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Business Venues */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                            🏢
                          </span>
                          Business Meeting Venues
                        </h3>
                        <div className="space-y-3">
                          {recommendations.meetings.map((item, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                            >
                              <h4 className="font-semibold text-lg">{item.name}</h4>
                              <p className="text-gray-600">{item.type}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Capacity: {item.capacity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;