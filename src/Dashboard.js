import React, { useState, useEffect } from 'react';
import { Search, Filter, ListFilter, ArrowUpDown, Plus, User, ChevronRight, MapPin, Calendar, Star, Globe, Plane, Heart, Settings, Bell, TrendingUp, Clock, Users, Sun, Moon, Cloud, Zap, Award, Compass, X } from 'lucide-react';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [weather, setWeather] = useState({ temp: 22, condition: 'Sunny', location: 'New York' });
  
  // New state for filter and search functionality
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    activities: []
  });
  
  // Filter options data
  const filterCategories = ['Beach', 'Mountain', 'City', 'Cultural', 'Adventure', 'Luxury', 'Budget'];
  const activityOptions = ['Scuba Diving', 'Skiing', 'Hiking', 'Sightseeing', 'Shopping', 'Spa', 'Cultural Tours'];
  const sortOptions = [
    { id: 'popularity', label: 'Most Popular', icon: TrendingUp },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated', icon: Star },
    { id: 'flights', label: 'Most Flights', icon: Plane }
  ];

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=800&auto=format&fit=crop';
  };

  const regions = [
    { 
      name: 'Maldives', 
      img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400', 
      flights: 45, 
      popularity: 95,
      category: ['Beach', 'Luxury'],
      price: 1200,
      rating: 4.8,
      activities: ['Scuba Diving', 'Beach Resort']
    },
    { 
      name: 'Switzerland', 
      img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=400', 
      flights: 32, 
      popularity: 88,
      category: ['Mountain', 'Adventure'],
      price: 1400,
      rating: 4.9,
      activities: ['Skiing', 'Mountain Trek']
    },
    { 
      name: 'Dubai', 
      img: 'https://images.unsplash.com/photo-1512453979798-5eaad0ff3b03?auto=format&fit=crop&q=80&w=400', 
      flights: 67, 
      popularity: 92,
      category: ['City', 'Luxury'],
      price: 1600,
      rating: 4.7,
      activities: ['Shopping', 'Sightseeing']
    },
    { 
      name: 'Bali', 
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400', 
      flights: 53, 
      popularity: 90,
      category: ['Beach', 'Cultural'],
      price: 900,
      rating: 4.6,
      activities: ['Cultural Tours', 'Beach Resort']
    },
    { 
      name: 'Paris', 
      img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400', 
      flights: 78, 
      popularity: 96,
      category: ['City', 'Cultural'],
      price: 1100,
      rating: 4.8,
      activities: ['Sightseeing', 'Cultural Tours']
    },
    { 
      name: 'Tokyo', 
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400', 
      flights: 41, 
      popularity: 87,
      category: ['City', 'Cultural'],
      price: 1300,
      rating: 4.7,
      activities: ['Sightseeing', 'Shopping']
    },
    { 
      name: 'Santorini', 
      img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400', 
      flights: 29, 
      popularity: 85,
      category: ['Beach', 'Luxury'],
      price: 1500,
      rating: 4.9,
      activities: ['Beach Resort', 'Sightseeing']
    },
    { 
      name: 'New York', 
      img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400', 
      flights: 89, 
      popularity: 98,
      category: ['City'],
      price: 1000,
      rating: 4.8,
      activities: ['Sightseeing', 'Shopping']
    },
  ];

  const previousTrips = [
    { 
      location: 'Andaman Islands', 
      date: 'Oct 2025', 
      img: 'https://images.unsplash.com/photo-1589133644743-57448c3fb1a8?auto=format&fit=crop&q=80&w=800',
      status: 'COMPLETED',
      rating: 4.8,
      days: 7,
      travelers: 2,
      price: '$2,450',
      activities: ['Scuba Diving', 'Island Hopping', 'Beach Resort']
    },
    { 
      location: 'Swiss Alps', 
      date: 'Aug 2025', 
      img: 'https://images.unsplash.com/photo-1626509653293-3532298642a8?auto=format&fit=crop&q=80&w=800',
      status: 'COMPLETED',
      rating: 4.9,
      days: 5,
      travelers: 4,
      price: '$3,200',
      activities: ['Skiing', 'Mountain Trek', 'Spa Retreat']
    },
    { 
      location: 'Singapore', 
      date: 'Jan 2025', 
      img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
      status: 'COMPLETED',
      rating: 4.7,
      days: 6,
      travelers: 3,
      price: '$1,890',
      activities: ['City Tour', 'Gardens', 'Shopping']
    }
  ];

  // Apply filters to regions
  const filteredRegions = regions.filter(region => {
    // Search filter
    if (searchQuery && !region.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedFilters.category.length > 0 && 
        !selectedFilters.category.some(cat => region.category.includes(cat))) {
      return false;
    }
    
    // Price filter
    if (region.price < selectedFilters.priceRange.min || region.price > selectedFilters.priceRange.max) {
      return false;
    }
    
    // Rating filter
    if (region.rating < selectedFilters.rating) {
      return false;
    }
    
    // Activities filter
    if (selectedFilters.activities.length > 0 && 
        !selectedFilters.activities.some(activity => region.activities.includes(activity))) {
      return false;
    }
    
    return true;
  });

  // Apply sorting
  const sortedRegions = [...filteredRegions].sort((a, b) => {
    // Default sorting by popularity
    return b.popularity - a.popularity;
  });

  // Handle filter selection
  const toggleCategoryFilter = (category) => {
    setSelectedFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const toggleActivityFilter = (activity) => {
    setSelectedFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      activities: []
    });
    setSearchQuery('');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterOptions && !event.target.closest('.filter-dropdown')) {
        setShowFilterOptions(false);
      }
      if (showSortOptions && !event.target.closest('.sort-dropdown')) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showFilterOptions, showSortOptions]);

  return (
    <div className={`min-h-screen font-sans transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900'
    } p-4 md:p-8`}>
      
      {/* Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              darkMode ? 'bg-cyan-400/20' : 'bg-blue-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-slow ${
                darkMode 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30'
              }`}>
                <Plane size={24} className="text-white" />
              </div>
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                darkMode 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                  : 'bg-gradient-to-r from-red-400 to-pink-400'
              }`}>
                <span className="text-xs font-bold text-white">3</span>
              </div>
            </div>
            <div>
              <h1 className={`text-3xl font-black tracking-tighter bg-clip-text text-transparent ${
                darkMode 
                  ? 'bg-gradient-to-r from-white via-cyan-100 to-white' 
                  : 'bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800'
              }`}>
                GlobalTrotter
              </h1>
              <p className={`text-xs tracking-[0.3em] ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                WORLDWIDE ADVENTURES
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Weather Widget */}
            <div className={`hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl border ${
              darkMode 
                ? 'bg-white/5 backdrop-blur-sm border-white/10' 
                : 'bg-white/80 backdrop-blur-sm border-gray-200'
            }`}>
              {weather.condition === 'Sunny' ? (
                <Sun size={18} className={darkMode ? 'text-yellow-400' : 'text-yellow-500'} />
              ) : weather.condition === 'Cloudy' ? (
                <Cloud size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              ) : (
                <Moon size={18} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
              )}
              <div>
                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {weather.temp}°C
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {weather.location}
                </div>
              </div>
            </div>
            
            {/* Notification Bell */}
            <button className={`relative p-2 rounded-xl border transition-all group ${
              darkMode 
                ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-cyan-500/30' 
                : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-400'
            }`}>
              <Bell size={20} className={darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-blue-600'} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </button>
            
            {/* Dark/Light Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all group ${
                darkMode 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-cyan-500/30' 
                  : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-400'
              }`}
            >
              {darkMode ? (
                <Sun size={20} className="text-gray-400 group-hover:text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-600 group-hover:text-blue-600" />
              )}
            </button>
            
            {/* User Profile */}
            <div className="relative group cursor-pointer">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                darkMode 
                  ? 'border-transparent group-hover:border-cyan-500' 
                  : 'border-transparent group-hover:border-blue-500'
              } transition-all duration-300`}>
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" 
                  alt="User" 
                  className="w-full h-full object-cover"
                  onError={addDefaultSrc}
                />
              </div>
              <div className={`absolute -bottom-12 right-0 rounded-xl p-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl ${
                darkMode 
                  ? 'bg-gray-900 border border-white/10' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Alex Morgan
                </div>
                <div className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Platinum Member
                </div>
                <div className="space-y-2">
                  <button className={`flex items-center gap-2 text-sm w-full transition-colors ${
                    darkMode ? 'hover:text-cyan-400' : 'hover:text-blue-600'
                  }`}>
                    <User size={14} /> Profile
                  </button>
                  <button className={`flex items-center gap-2 text-sm w-full transition-colors ${
                    darkMode ? 'hover:text-cyan-400' : 'hover:text-blue-600'
                  }`}>
                    <Settings size={14} /> Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className={`relative h-[400px] rounded-[4rem] mb-16 overflow-hidden group ${
        darkMode ? '' : 'shadow-2xl shadow-blue-500/10'
      }`}>
        <div className={`absolute inset-0 z-10 ${
          darkMode 
            ? 'bg-gradient-to-r from-black/80 via-transparent to-black/60' 
            : 'bg-gradient-to-r from-blue-900/40 via-transparent to-blue-900/30'
        }`}></div>
        
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000"
          alt="Mountain Landscape"
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s]"
        />
        
        <div className="relative z-20 h-full flex items-center px-8 md:px-12">
          <div className="max-w-2xl">
            <div className={`flex items-center gap-3 mb-6 px-4 py-2 rounded-full ${
              darkMode 
                ? 'bg-white/10 backdrop-blur-sm' 
                : 'bg-white/80 backdrop-blur-sm'
            } w-fit`}>
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                darkMode ? 'bg-cyan-400' : 'bg-blue-500'
              }`}></div>
              <span className={`text-sm font-bold tracking-widest ${
                darkMode ? 'text-cyan-300' : 'text-blue-600'
              }`}>
                LIMITED TIME OFFER
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span>Elevate Your</span>
              <br />
              <span className={`bg-clip-text text-transparent ${
                darkMode 
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                  : 'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600'
              }`}>
                Travel Experience
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Exclusive deals on premium destinations. Book before March 31 for up to 40% off.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-3 group shadow-2xl ${
                darkMode 
                  ? 'bg-white text-black' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
              }`}>
                <span className="text-sm md:text-base">BOOK NOW</span>
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-white text-gray-800'
              }`}>
                <span className="text-sm md:text-base">WATCH TRAILER</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-16 max-w-6xl mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          
          {/* Search Bar */}
          <div className="relative flex-grow group">
            <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500 ${
              darkMode ? 'bg-cyan-500/20' : 'bg-blue-500/10'
            }`}></div>
            
            <div className={`relative flex items-center border rounded-2xl h-14 px-6 transition-all duration-300 ${
              darkMode 
                ? 'bg-black/40 backdrop-blur-md border-white/20 group-hover:border-white/40 group-focus-within:border-cyan-500' 
                : 'bg-white/80 backdrop-blur-md border-gray-200 group-hover:border-gray-300 group-focus-within:border-blue-500 shadow-sm'
            }`}>
              <Search size={20} className={`mr-4 transition-colors ${
                darkMode ? 'text-gray-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-blue-500'
              }`} />
              <input 
                type="text" 
                placeholder="Search destinations, activities..." 
                className={`bg-transparent w-full focus:outline-none text-lg font-light tracking-wide ${
                  darkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-4"
                >
                  <X size={18} className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'} />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 h-14 relative">
            {/* Filter Button with Dropdown */}
            <div className="relative filter-dropdown">
              <button 
                onClick={() => {
                  setShowFilterOptions(!showFilterOptions);
                  setShowSortOptions(false);
                }}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-3 border rounded-2xl px-8 transition-all duration-500 active:scale-95 group ${
                  darkMode 
                    ? 'border-white/20 bg-white/[0.02] text-gray-300 hover:bg-white hover:text-black hover:border-white' 
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 shadow-sm'
                } ${showFilterOptions ? (darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white') : ''}`}
              >
                <Filter size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap">
                  Filter
                </span>
                {(selectedFilters.category.length > 0 || selectedFilters.activities.length > 0) && (
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                    darkMode ? 'bg-cyan-500 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {selectedFilters.category.length + selectedFilters.activities.length}
                  </div>
                )}
              </button>
              
              {/* Filter Dropdown */}
              {showFilterOptions && (
                <div className={`absolute top-full mt-2 right-0 w-96 rounded-2xl shadow-2xl z-50 filter-dropdown ${
                  darkMode 
                    ? 'bg-gray-900 border border-white/10' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Filter Options
                      </h3>
                      <button 
                        onClick={clearAllFilters}
                        className={`text-sm ${darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'}`}
                      >
                        Clear All
                      </button>
                    </div>
                    
                    {/* Categories */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filterCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => toggleCategoryFilter(category)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                              selectedFilters.category.includes(category)
                                ? darkMode 
                                  ? 'bg-cyan-500 text-white' 
                                  : 'bg-blue-600 text-white'
                                : darkMode
                                  ? 'bg-white/5 hover:bg-white/10'
                                  : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Activities */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Activities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activityOptions.map((activity) => (
                          <button
                            key={activity}
                            onClick={() => toggleActivityFilter(activity)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                              selectedFilters.activities.includes(activity)
                                ? darkMode 
                                  ? 'bg-purple-500 text-white' 
                                  : 'bg-purple-600 text-white'
                                : darkMode
                                  ? 'bg-white/5 hover:bg-white/10'
                                  : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {activity}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Price Range: ${selectedFilters.priceRange.min} - ${selectedFilters.priceRange.max}
                      </h4>
                      <div className="px-2">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          step="100"
                          value={selectedFilters.priceRange.max}
                          onChange={(e) => setSelectedFilters(prev => ({
                            ...prev,
                            priceRange: { ...prev.priceRange, max: parseInt(e.target.value) }
                          }))}
                          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                            darkMode ? 'bg-white/10' : 'bg-gray-200'
                          }`}
                        />
                      </div>
                    </div>
                    
                    {/* Rating Filter */}
                    <div>
                      <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Minimum Rating: {selectedFilters.rating.toFixed(1)}+
                      </h4>
                      <div className="flex gap-2">
                        {[0, 3.5, 4.0, 4.5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setSelectedFilters(prev => ({ ...prev, rating }))}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                              selectedFilters.rating === rating
                                ? darkMode 
                                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                                  : 'bg-yellow-100 text-yellow-600 border border-yellow-300'
                                : darkMode
                                  ? 'bg-white/5 hover:bg-white/10'
                                  : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {rating === 0 ? 'Any' : `${rating}+`}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Applied Filters Summary */}
                    {(selectedFilters.category.length > 0 || selectedFilters.activities.length > 0) && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Active Filters:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedFilters.category.map(cat => (
                            <div key={cat} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400">
                              {cat} <X size={10} onClick={() => toggleCategoryFilter(cat)} className="cursor-pointer" />
                            </div>
                          ))}
                          {selectedFilters.activities.map(act => (
                            <div key={act} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                              {act} <X size={10} onClick={() => toggleActivityFilter(act)} className="cursor-pointer" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sort Button with Dropdown */}
            <div className="relative sort-dropdown">
              <button 
                onClick={() => {
                  setShowSortOptions(!showSortOptions);
                  setShowFilterOptions(false);
                }}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-3 border rounded-2xl px-8 transition-all duration-500 active:scale-95 group ${
                  darkMode 
                    ? 'border-white/20 bg-white/[0.02] text-gray-300 hover:bg-white hover:text-black hover:border-white' 
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 shadow-sm'
                } ${showSortOptions ? (darkMode ? 'bg-white text-black' : 'bg-gray-900 text-white') : ''}`}
              >
                <ArrowUpDown size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap">
                  Sort
                </span>
              </button>
              
              {/* Sort Dropdown */}
              {showSortOptions && (
                <div className={`absolute top-full mt-2 right-0 w-64 rounded-2xl shadow-2xl z-50 sort-dropdown ${
                  darkMode 
                    ? 'bg-gray-900 border border-white/10' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="p-4">
                    <h3 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Sort By
                    </h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            // Implement sorting logic here
                            console.log('Sort by:', option.id);
                            setShowSortOptions(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                            darkMode 
                              ? 'hover:bg-white/5' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {option.label}
                          </span>
                          {option.icon && (
                            <option.icon size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedFilters.category.length > 0 || selectedFilters.activities.length > 0) && (
          <div className="mt-4 flex items-center gap-4 px-6">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${darkMode ? 'bg-cyan-500' : 'bg-blue-600'}`}></div>
              <span className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Showing {sortedRegions.length} of {regions.length} destinations
              </span>
            </div>
            
            {searchQuery && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-600'}`}>
                Search: "{searchQuery}"
                <X size={12} onClick={() => setSearchQuery('')} className="cursor-pointer ml-1" />
              </div>
            )}
            
            {selectedFilters.category.map(cat => (
              <div key={cat} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400">
                {cat}
                <X size={12} onClick={() => toggleCategoryFilter(cat)} className="cursor-pointer ml-1" />
              </div>
            ))}
            
            {selectedFilters.activities.map(act => (
              <div key={act} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400">
                {act}
                <X size={12} onClick={() => toggleActivityFilter(act)} className="cursor-pointer ml-1" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Destinations */}
      <section className="mb-16 md:mb-20">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative">
              <div className={`w-2 h-8 md:h-10 rounded-full ${
                darkMode ? 'bg-gradient-to-b from-cyan-500 to-blue-500' : 'bg-gradient-to-b from-blue-500 to-blue-600'
              }`}></div>
              <div className={`absolute top-0 left-0 w-2 h-8 md:h-10 rounded-full animate-pulse ${
                darkMode ? 'bg-gradient-to-b from-cyan-500 to-blue-500' : 'bg-gradient-to-b from-blue-500 to-blue-600'
              }`}></div>
            </div>
            <div>
              <h3 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Trending Worldwide
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm md:text-base`}>
                {searchQuery || selectedFilters.category.length > 0 ? 'Filtered results' : 'Destinations everyone\'s talking about'}
              </p>
            </div>
          </div>
          
          {/* Results Count */}
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {sortedRegions.length} destinations found
          </div>
        </div>

        {sortedRegions.length === 0 ? (
          <div className={`text-center py-16 rounded-3xl ${
            darkMode 
              ? 'bg-black/40 backdrop-blur-sm border border-white/10' 
              : 'bg-white/90 backdrop-blur-sm border border-gray-200'
          }`}>
            <div className="text-6xl mb-4">🌍</div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No destinations found
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearAllFilters}
              className={`px-6 py-3 rounded-xl font-bold ${
                darkMode 
                  ? 'bg-cyan-500 hover:bg-cyan-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedRegions.map((region, i) => (
              <div 
                key={i}
                className="group relative cursor-pointer transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`absolute inset-0 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' 
                    : 'bg-gradient-to-br from-blue-400/20 to-blue-500/20'
                }`}></div>
                
                <div className={`relative z-10 rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-black/40 backdrop-blur-sm border-white/10 group-hover:border-cyan-500/30' 
                    : 'bg-white/90 backdrop-blur-sm border-gray-200 group-hover:border-blue-400'
                }`}>
                  <div className="relative h-40 md:h-56 overflow-hidden">
                    <img 
                      src={region.img} 
                      alt={region.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={addDefaultSrc}
                    />
                    <div className={`absolute inset-0 ${
                      darkMode 
                        ? 'bg-gradient-to-t from-black via-transparent to-transparent' 
                        : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
                    }`}></div>
                    
                    <div className="absolute top-3 md:top-4 right-3 md:right-4">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full blur-sm ${
                          darkMode 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-green-400 to-emerald-400'
                        }`}></div>
                        <div className={`relative rounded-full px-2 md:px-3 py-1 md:py-1.5 text-xs font-bold ${
                          darkMode 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-r from-green-500 to-emerald-500'
                        } text-white`}>
                          {region.popularity}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Badges */}
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-1">
                      {region.category.slice(0, 2).map((cat, idx) => (
                        <div 
                          key={idx}
                          className={`px-2 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm ${
                            darkMode 
                              ? 'bg-black/40 text-cyan-300' 
                              : 'bg-white/80 text-blue-600'
                          }`}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex justify-between items-center">
                      <button className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 transform translate-y-3 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
                        darkMode 
                          ? 'bg-white text-black hover:bg-gray-100' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        VIEW
                      </button>
                      <button className={`p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 transform translate-y-3 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 ${
                        darkMode 
                          ? 'bg-black/40 hover:bg-black/60' 
                          : 'bg-white/80 hover:bg-white'
                      }`}>
                        <Heart size={14} className={darkMode ? 'text-white' : 'text-gray-700'} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-5">
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <h4 className={`font-bold text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {region.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {region.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between text-xs md:text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Plane size={12} />
                        <span className="truncate">{region.flights} flights/wk</span>
                      </div>
                      <div className={`font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                        ${region.price}
                      </div>
                    </div>
                    
                    {/* Activities */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {region.activities.slice(0, 2).map((activity, idx) => (
                        <span 
                          key={idx}
                          className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                            darkMode 
                              ? 'bg-white/5 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Remaining sections (Travel History Timeline, Enhanced Floating CTA, Bottom Navigation) */}
      {/* ... Keep all the remaining sections exactly as they were in your original code ... */}
      
      {/* Travel History Timeline Section */}
      <section className="mb-20 md:mb-24">
        {/* ... Keep exactly as is ... */}
      </section>

      {/* Enhanced Floating CTA */}
      <div className="fixed bottom-6 md:bottom-8 right-4 md:right-8 z-50">
        {/* ... Keep exactly as is ... */}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 md:hidden">
        {/* ... Keep exactly as is ... */}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;