import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Users,
  Bell,
  Search,
  Filter,
  Bus,
  ArrowRight,
  Menu,
  LogOut,
  Settings as SettingsIcon,
  Ticket,
} from "lucide-react";
import { useNavigate } from "@remix-run/react";

const SchedulePage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [scheduleData, setScheduleData] = useState({ upcoming: [], completed: [] });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userName = localStorage.getItem('userName');
    const savedSchedule = localStorage.getItem('scheduleData');
  
    if (isAuthenticated !== 'true') {
      navigate("/login");
    } else {
      setName(userName || "User");
      if (savedSchedule) {
        setScheduleData(JSON.parse(savedSchedule));
      } else {
        const initialScheduleData = {
          upcoming: [],
          completed: []
        };
        localStorage.setItem('scheduleData', JSON.stringify(initialScheduleData));
        setScheduleData(initialScheduleData);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'newBooking') {
        const newBooking = JSON.parse(e.newValue);
        if (newBooking) {
          setScheduleData(prevData => {
            const newData = {
              ...prevData,
              upcoming: [...prevData.upcoming, newBooking]
            };
            return newData;
          });
        }
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate("/login");
  };

  const navigationItems = [
    { name: "Booking", icon: Ticket, path: "/booking" },
    { name: "Schedule", icon: Calendar, path: "/schedule" },
    { name: "Settings", icon: SettingsIcon, path: "/settings" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Completed":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredSchedule = scheduleData[activeTab].filter(schedule => {
    const matchesSearch = 
      schedule.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.to.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && schedule.busType.toLowerCase().includes(selectedFilter.toLowerCase());
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-violet-200">
      <div className="bg-white/80 backdrop-blur-lg">
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
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.name === "Schedule"
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
                My Schedule
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

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                >
                  <option value="all">All Types</option>
                  <option value="regular">Regular Bus</option>
                  <option value="sleeper">Sleeper Bus</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "upcoming"
                    ? "bg-violet-500 text-white"
                    : "bg-white text-gray-600 hover:bg-violet-50"
                }`}
              >
                Upcoming Trips
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "completed"
                    ? "bg-violet-500 text-white"
                    : "bg-white text-gray-600 hover:bg-violet-50"
                }`}
              >
                Completed Trips
              </button>
            </div>

            {/* Schedule Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSchedule.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <Bus className="text-violet-500" size={24} />
                      <div>
                        <h3 className="font-semibold text-lg">{schedule.busType}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Ticket Price</div>
                      <div className="font-bold text-violet-600">
                        Rp {schedule.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="font-medium">{schedule.from}</span>
                        </div>
                      </div>
                      <ArrowRight className="text-violet-500" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="font-medium">{schedule.to}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Date</div>
                        <div className="font-medium">{new Date(schedule.date).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="font-medium">{schedule.time}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Seat</div>
                        <div className="font-medium">{schedule.seatNumber}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Estimated Duration: {schedule.estimatedDuration}
                        </div>
                        <button className="px-4 py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;