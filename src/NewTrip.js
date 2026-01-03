import React, { useState } from 'react';
import { 
  ChevronLeft, Calendar, MapPin, Plane, 
  Users, DollarSign, Sparkles, Search, 
  ArrowRight, Globe, Sun, Moon,
  Filter, Settings, Bell, Heart,
  TrendingUp, Clock, Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '2',
    budget: '2000',
    tripType: 'vacation'
  });
  const [darkMode, setDarkMode] = useState(false);

  const tripTypes = [
    { id: 'vacation', label: 'Vacation', icon: Sun, color: 'bg-amber-500' },
    { id: 'adventure', label: 'Adventure', icon: Compass, color: 'bg-emerald-500' },
    { id: 'business', label: 'Business', icon: DollarSign, color: 'bg-blue-500' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'bg-rose-500' },
    { id: 'family', label: 'Family', icon: Users, color: 'bg-purple-500' },
    { id: 'solo', label: 'Solo', icon: User, color: 'bg-indigo-500' }
  ];

  const popularDestinations = [
    { 
      id: 1, 
      name: 'Bali, Indonesia', 
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      price: '$1,299',
      duration: '7 days',
      rating: 4.8,
      category: 'Beach'
    },
    { 
      id: 2, 
      name: 'Swiss Alps', 
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
      price: '$2,499',
      duration: '5 days',
      rating: 4.9,
      category: 'Mountain'
    },
    { 
      id: 3, 
      name: 'Kyoto, Japan', 
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
      price: '$2,199',
      duration: '8 days',
      rating: 4.7,
      category: 'Cultural'
    },
    { 
      id: 4, 
      name: 'Santorini, Greece', 
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
      price: '$2,899',
      duration: '6 days',
      rating: 4.9,
      category: 'Beach'
    },
    { 
      id: 5, 
      name: 'New York, USA', 
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      price: '$1,899',
      duration: '5 days',
      rating: 4.6,
      category: 'City'
    },
    { 
      id: 6, 
      name: 'Dubai, UAE', 
      image: 'https://images.unsplash.com/photo-1512453979798-5eaad0ff3b03?w=800',
      price: '$2,599',
      duration: '4 days',
      rating: 4.8,
      category: 'Luxury'
    }
  ];

  const activities = [
    { name: 'Scuba Diving', icon: '🤿', color: 'bg-blue-100 text-blue-600' },
    { name: 'Skiing', icon: '⛷️', color: 'bg-sky-100 text-sky-600' },
    { name: 'Hiking', icon: '🥾', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Sightseeing', icon: '🏛️', color: 'bg-amber-100 text-amber-600' },
    { name: 'Shopping', icon: '🛍️', color: 'bg-purple-100 text-purple-600' },
    { name: 'Spa & Wellness', icon: '🧖', color: 'bg-rose-100 text-rose-600' },
    { name: 'Food Tours', icon: '🍜', color: 'bg-orange-100 text-orange-600' },
    { name: 'Photography', icon: '📸', color: 'bg-indigo-100 text-indigo-600' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trip Plan Submitted:', formData);
    
    // Navigate to TripSection page with form data as state
    navigate('/trip-sections', { 
      state: { 
        tripData: formData,
        timestamp: new Date().toISOString() 
      } 
    });
    
    // Alternatively, if you want to pass data via URL params:
    // navigate(`/trip-section?destination=${encodeURIComponent(formData.destination)}&type=${formData.tripType}`);
  };

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800';
  };

  const handleExploreDestination = (destination) => {
    // When clicking on a popular destination, populate the form
    setFormData({
      ...formData,
      destination: destination.name,
      budget: destination.price.replace('$', '').replace(',', ''),
      tripType: getTripTypeFromCategory(destination.category)
    });
    
    // Optional: Scroll to the form
    document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTripTypeFromCategory = (category) => {
    switch(category) {
      case 'Beach': return 'vacation';
      case 'Mountain': return 'adventure';
      case 'Cultural': return 'vacation';
      case 'City': return 'business';
      case 'Luxury': return 'romantic';
      default: return 'vacation';
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
    }`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-3 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                    : 'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  <Plane className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">GlobalTrotter</h1>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Plan Your Next Adventure
                  </p>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {darkMode ? (
                  <Sun size={20} className="text-amber-400" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>
              
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/30">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={addDefaultSrc}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }`}>
              <Compass className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Plan Your Dream Trip</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Fill in the details below and we'll create a personalized itinerary
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Trip Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Details Card */}
            <div id="trip-form" className={`rounded-2xl border ${
              darkMode 
                ? 'bg-gray-900/50 border-gray-800' 
                : 'bg-white border-gray-200'
            } shadow-xl p-6`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-blue-900/50' : 'bg-blue-50'
                }`}>
                  <Calendar className={darkMode ? 'text-blue-400' : 'text-blue-500'} size={18} />
                </div>
                <h2 className="text-xl font-bold">Trip Details</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Destination */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} size={20} />
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      End Date
                    </label>
                    <input
                      type="date"
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Travelers & Budget */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Number of Travelers
                    </label>
                    <div className="relative">
                      <Users className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} size={20} />
                      <select
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                        value={formData.travelers}
                        onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Budget (per person)
                    </label>
                    <div className="relative">
                      <DollarSign className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} size={20} />
                      <select
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      >
                        <option value="1000">$1,000 - $1,500</option>
                        <option value="2000">$1,500 - $2,500</option>
                        <option value="3500">$2,500 - $4,000</option>
                        <option value="5000">$4,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Trip Type */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Trip Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tripTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({...formData, tripType: type.id})}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          formData.tripType === type.id
                            ? `${type.color} text-white border-transparent shadow-lg`
                            : darkMode
                              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <type.icon size={24} />
                        <span className="mt-2 text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Preferred Activities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activities.map((activity) => (
                      <button
                        key={activity.name}
                        type="button"
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                            : activity.color
                        }`}
                      >
                        <span className="text-lg">{activity.icon}</span>
                        <span className="text-sm font-medium">{activity.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <Sparkles size={20} />
                    Generate Personalized Itinerary
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Popular Destinations */}
            <div className={`rounded-2xl border ${
              darkMode 
                ? 'bg-gray-900/50 border-gray-800' 
                : 'bg-white border-gray-200'
            } shadow-xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-emerald-900/50' : 'bg-emerald-50'
                  }`}>
                    <TrendingUp className={darkMode ? 'text-emerald-400' : 'text-emerald-500'} size={18} />
                  </div>
                  <h2 className="text-xl font-bold">Popular Destinations</h2>
                </div>
                <button className={`text-sm font-medium flex items-center gap-2 ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  View All
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularDestinations.map((destination) => (
                  <div 
                    key={destination.id}
                    onClick={() => handleExploreDestination(destination)}
                    className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50' 
                        : 'bg-gray-50 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={addDefaultSrc}
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/90 text-gray-700'
                        }`}>
                          {destination.category}
                        </span>
                      </div>
                      <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t ${
                        darkMode ? 'from-gray-900 to-transparent' : 'from-gray-900/60 to-transparent'
                      } p-3`}>
                        <h3 className="text-white font-bold text-sm">{destination.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-400 fill-yellow-400" size={12} />
                            <span className="text-white text-xs">{destination.rating}</span>
                          </div>
                          <span className="text-white text-sm font-bold">{destination.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {destination.duration}
                        </span>
                        <button className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                          darkMode 
                            ? 'bg-blue-900/50 text-blue-400 hover:bg-blue-800' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}>
                          Use This
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Tips & Progress */}
          <div className="space-y-8">
            {/* Quick Tips Card */}
            <div className={`rounded-2xl border ${
              darkMode 
                ? 'bg-gray-900/50 border-gray-800' 
                : 'bg-white border-gray-200'
            } shadow-xl p-6`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-amber-900/50' : 'bg-amber-50'
                }`}>
                  <Sparkles className={darkMode ? 'text-amber-400' : 'text-amber-500'} size={18} />
                </div>
                <h2 className="text-xl font-bold">Quick Tips</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      Be Specific
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Mention specific attractions or activities you're interested in.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
                  }`}>
                    <span className="text-sm font-bold text-emerald-600">2</span>
                  </div>
                  <div>
                    <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      Realistic Budget
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Include accommodation, food, and activity costs in your budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                  }`}>
                    <span className="text-sm font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      Travel Preferences
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Select activities that match your interests for better recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className={`rounded-2xl border ${
              darkMode 
                ? 'bg-gray-900/50 border-gray-800' 
                : 'bg-white border-gray-200'
            } shadow-xl p-6`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-green-900/50' : 'bg-green-50'
                }`}>
                  <Clock className={darkMode ? 'text-green-400' : 'text-green-500'} size={18} />
                </div>
                <h2 className="text-xl font-bold">Trip Progress</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Planning Progress
                    </span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {!formData.destination ? '25%' : 
                       !formData.startDate || !formData.endDate ? '40%' : 
                       !formData.travelers || !formData.budget ? '60%' : 
                       '100%'}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ${
                      !formData.destination ? 'w-1/4' : 
                      !formData.startDate || !formData.endDate ? 'w-2/5' : 
                      !formData.travelers || !formData.budget ? 'w-3/5' : 
                      'w-full'
                    }`}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      formData.destination ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}>
                      {formData.destination ? (
                        <span className="text-white text-xs">✓</span>
                      ) : (
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>1</span>
                      )}
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Destination selected
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      formData.startDate && formData.endDate ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}>
                      {formData.startDate && formData.endDate ? (
                        <span className="text-white text-xs">✓</span>
                      ) : (
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>2</span>
                      )}
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Dates selected
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      formData.travelers && formData.budget ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}>
                      {formData.travelers && formData.budget ? (
                        <span className="text-white text-xs">✓</span>
                      ) : (
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>3</span>
                      )}
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Travel details added
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}>
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>4</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Generate itinerary
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Trips */}
            <div className={`rounded-2xl border ${
              darkMode 
                ? 'bg-gray-900/50 border-gray-800' 
                : 'bg-white border-gray-200'
            } shadow-xl p-6`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-purple-900/50' : 'bg-purple-50'
                }`}>
                  <Globe className={darkMode ? 'text-purple-400' : 'text-purple-500'} size={18} />
                </div>
                <h2 className="text-xl font-bold">Recent Trips</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1740&auto=format&fit=crop"
                      alt="Andaman"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      Andaman Islands
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      Oct 2025 • 7 days
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'
                  }`}>
                    Completed
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1740&auto=format&fit=crop"
                      alt="Swiss Alps"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      Swiss Alps
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      Aug 2025 • 5 days
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'
                  }`}>
                    Completed
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=200"
                      alt="Singapore"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      Singapore
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      Jan 2025 • 6 days
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-50 text-blue-600'
                  }`}>
                    Completed
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/trip-sections')}
                className={`w-full mt-6 py-3 rounded-xl text-center font-medium transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                View All Trips
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/')}
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 ${
          darkMode 
            ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700' 
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
};

// Star component for ratings
const Star = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// User component
const User = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default NewTrip;