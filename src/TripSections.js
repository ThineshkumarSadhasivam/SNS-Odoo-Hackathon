import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Plus, Calendar, DollarSign,
  Edit2, Trash2, Save, X,
  Plane, Hotel, MapPin, Camera, Utensils,
  User as UserIcon, Sun, Moon, Users, Compass, Heart
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const TripSections = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [tripData, setTripData] = useState(null);
  
  // Initialize sections based on tripData or default
  const [sections, setSections] = useState(() => {
    // Try to get tripData from location state
    const data = location.state?.tripData || null;
    
    if (data) {
      const formatDate = (dateString) => {
        if (!dateString) return 'Date not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
      };
      
      const getTripTypeIcon = (type) => {
        switch(type) {
          case 'vacation': return '🏖️';
          case 'adventure': return '🥾';
          case 'business': return '💼';
          case 'romantic': return '💝';
          case 'family': return '👨‍👩‍👧‍👦';
          case 'solo': return '🧳';
          default: return '📍';
        }
      };
      
      const getTripTypeColor = (type) => {
        switch(type) {
          case 'vacation': return 'amber';
          case 'adventure': return 'emerald';
          case 'business': return 'blue';
          case 'romantic': return 'rose';
          case 'family': return 'purple';
          case 'solo': return 'indigo';
          default: return 'blue';
        }
      };
      
      const getTripDescription = (type, destination) => {
        const descriptions = {
          vacation: `Enjoy a relaxing vacation in ${destination}. This itinerary includes leisure activities, sightseeing, and plenty of time to unwind.`,
          adventure: `Embark on an exciting adventure in ${destination}! This plan includes outdoor activities, exploration, and thrilling experiences.`,
          business: `Business trip to ${destination}. This itinerary focuses on meetings, networking opportunities, and efficient travel arrangements.`,
          romantic: `Romantic getaway to ${destination}. This plan includes intimate dining, scenic spots, and special moments for couples.`,
          family: `Family vacation to ${destination}. This itinerary includes family-friendly activities, comfortable accommodations, and fun for all ages.`,
          solo: `Solo travel adventure to ${destination}. This plan focuses on self-discovery, flexibility, and personalized experiences.`
        };
        return descriptions[type] || `Your trip to ${destination}. Customized based on your preferences.`;
      };
      
      return [
        {
          id: 1,
          title: `${data.destination}: Arrival & Accommodation`,
          description: `Welcome to ${data.destination}! Your adventure begins here. This section covers your arrival, airport transfer, and check-in at your accommodation.`,
          dateRange: `${formatDate(data.startDate)}`,
          budget: `$${Math.floor(parseInt(data.budget || 2000) * 0.3)}`,
          author: data.travelers === '1' ? 'Solo Traveler' : `${data.travelers} Travelers`,
          icon: getTripTypeIcon(data.tripType),
          color: getTripTypeColor(data.tripType),
          tripType: data.tripType
        },
        {
          id: 2,
          title: `${data.destination}: Exploration & Activities`,
          description: getTripDescription(data.tripType, data.destination),
          dateRange: `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`,
          budget: `$${Math.floor(parseInt(data.budget || 2000) * 0.4)}`,
          author: '',
          icon: data.tripType === 'adventure' ? '🥾' : 
                data.tripType === 'business' ? '💼' : 
                data.tripType === 'romantic' ? '💝' : '🏛️',
          color: getTripTypeColor(data.tripType),
          tripType: data.tripType
        },
        {
          id: 3,
          title: `${data.destination}: Departure`,
          description: `Final days in ${data.destination}. This section includes last-minute shopping, sightseeing, and departure preparations.`,
          dateRange: `${formatDate(data.endDate)}`,
          budget: `$${Math.floor(parseInt(data.budget || 2000) * 0.3)}`,
          author: '',
          icon: '✈️',
          color: getTripTypeColor(data.tripType),
          tripType: data.tripType
        }
      ];
    }
    
    // Default sections if no tripData
    return [
      {
        id: 1,
        title: 'Section 1:',
        description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
        dateRange: 'Dec 15, 2023 to Dec 20, 2023',
        budget: '$1,200',
        author: 'Genuine Whale',
        icon: '✈️',
        color: 'blue',
        tripType: 'vacation'
      },
      {
        id: 2,
        title: 'Section 2:',
        description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
        dateRange: 'Dec 21, 2023 to Dec 25, 2023',
        budget: '$850',
        author: '',
        icon: '🏨',
        color: 'green',
        tripType: 'vacation'
      },
      {
        id: 3,
        title: 'Section 3:',
        description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
        dateRange: 'Dec 26, 2023 to Dec 30, 2023',
        budget: '$950',
        author: 'Authorized Panther',
        icon: '📸',
        color: 'purple',
        tripType: 'vacation'
      }
    ];
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const icons = [
    { icon: '✈️', label: 'Flight', component: Plane },
    { icon: '🏨', label: 'Hotel', component: Hotel },
    { icon: '📍', label: 'Location', component: MapPin },
    { icon: '📸', label: 'Activity', component: Camera },
    { icon: '🍽️', label: 'Dining', component: Utensils },
    { icon: '🏖️', label: 'Beach', component: Sun },
    { icon: '🥾', label: 'Hiking', component: Compass },
    { icon: '💼', label: 'Business', component: DollarSign },
    { icon: '💝', label: 'Romantic', component: Heart },
    { icon: '👨‍👩‍👧‍👦', label: 'Family', component: Users },
    { icon: '🧳', label: 'Solo', component: UserIcon },
  ];

  const colors = [
    { name: 'blue', class: 'bg-blue-500', text: 'text-blue-500' },
    { name: 'green', class: 'bg-green-500', text: 'text-green-500' },
    { name: 'purple', class: 'bg-purple-500', text: 'text-purple-500' },
    { name: 'orange', class: 'bg-orange-500', text: 'text-orange-500' },
    { name: 'pink', class: 'bg-pink-500', text: 'text-pink-500' },
    { name: 'amber', class: 'bg-amber-500', text: 'text-amber-500' },
    { name: 'emerald', class: 'bg-emerald-500', text: 'text-emerald-500' },
    { name: 'rose', class: 'bg-rose-500', text: 'text-rose-500' },
    { name: 'indigo', class: 'bg-indigo-500', text: 'text-indigo-500' },
  ];

  useEffect(() => {
    // Set tripData from location when component mounts
    if (location.state?.tripData) {
      setTripData(location.state.tripData);
      console.log('Received trip data:', location.state.tripData);
    }
  }, [location]);

  const handleEdit = (section) => {
    setEditingId(section.id);
    setEditForm({
      title: section.title,
      description: section.description,
      dateRange: section.dateRange,
      budget: section.budget,
      author: section.author,
      icon: section.icon,
      color: section.color,
      tripType: section.tripType || 'vacation'
    });
  };

  const handleSave = (id) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, ...editForm } : section
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    setSections(sections.filter(section => section.id !== id));
    setShowDeleteConfirm(null);
  };

  const addNewSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    const currentTripType = tripData?.tripType || 'vacation';
    
    const getDefaultIcon = (tripType) => {
      switch(tripType) {
        case 'vacation': return '🏖️';
        case 'adventure': return '🥾';
        case 'business': return '💼';
        case 'romantic': return '💝';
        case 'family': return '👨‍👩‍👧‍👦';
        case 'solo': return '🧳';
        default: return '📍';
      }
    };
    
    const newSection = {
      id: newId,
      title: tripData ? `Extra Day in ${tripData.destination}` : `Section ${newId}:`,
      description: tripData ? 
        `Additional day to explore ${tripData.destination}. Customize this section based on your interests.` :
        'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      dateRange: tripData?.startDate ? 
        `Based on your ${currentTripType} trip dates` : 
        'Jan 1, 2024 to Jan 5, 2024',
      budget: tripData ? 
        `$${Math.floor(parseInt(tripData.budget || 2000) * 0.2)}` : 
        '$500',
      author: '',
      icon: getDefaultIcon(currentTripType),
      color: colors[newId % colors.length].name,
      tripType: currentTripType
    };
    setSections([...sections, newSection]);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
  };

  // Calculate total budget safely
  const calculateTotalBudget = () => {
    return sections.reduce((sum, section) => {
      const budget = parseInt(section.budget.replace(/[^0-9]/g, '')) || 0;
      return sum + budget;
    }, 0);
  };

  const getColorClass = (colorName) => {
    const color = colors.find(c => c.name === colorName);
    return color ? color.class : 'bg-blue-500';
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
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
                    : 'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  <ChevronLeft className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">GlobalTrotter</h1>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tripData ? `Trip to ${tripData.destination}` : 'Trip Sections Planner'}
                  </p>
                </div>
              </button>
            </div>

            {tripData && (
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {tripData.destination} • {tripData.tripType?.charAt(0).toUpperCase() + tripData.tripType?.slice(1)} • 
                    ${tripData.budget} • {tripData.travelers} {tripData.travelers === '1' ? 'Traveler' : 'Travelers'}
                  </span>
                </div>
              </div>
            )}

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

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">
            {tripData ? `Your ${tripData.tripType} Trip to ${tripData.destination}` : 'Trip Sections Planner'}
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {tripData ? 
              `Your personalized itinerary for ${tripData.destination}. Each section represents a different part of your ${tripData.tripType} adventure.` :
              'Organize your trip into sections. Each section can represent a different location, activity, or accommodation.'
            }
          </p>
        </div>

        {/* Trip Summary Banner */}
        {tripData && (
          <div className={`mb-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-900/50' : 'bg-blue-50'} border ${darkMode ? 'border-gray-800' : 'border-blue-200'}`}>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Destination</div>
                <div className="font-bold text-lg">{tripData.destination}</div>
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dates</div>
                <div className="font-bold text-lg">
                  {tripData.startDate ? new Date(tripData.startDate).toLocaleDateString() : 'Not set'} - 
                  {tripData.endDate ? new Date(tripData.endDate).toLocaleDateString() : 'Not set'}
                </div>
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Travelers</div>
                <div className="font-bold text-lg">{tripData.travelers} {tripData.travelers === '1' ? 'Traveler' : 'Travelers'}</div>
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Budget</div>
                <div className="font-bold text-lg">${tripData.budget}</div>
              </div>
            </div>
          </div>
        )}

        {/* Sections List */}
        <div className="space-y-8 mb-12">
          {sections.map((section) => (
            <div key={section.id} className="relative">
              {/* Section Card */}
              <div className={`rounded-2xl border ${
                darkMode 
                  ? 'bg-gray-900/50 border-gray-800' 
                  : 'bg-white border-gray-200'
              } shadow-xl overflow-hidden`}>
                
                {/* Section Header with Color Accent */}
                <div className={`p-6 border-b flex items-start justify-between ${
                  darkMode ? 'border-gray-800' : 'border-gray-200'
                }`} style={{
                  borderLeft: `6px solid var(--color-${section.color})`
                }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                      {section.author && (
                        <div className={`flex items-center gap-2 mt-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <UserIcon size={14} />
                          <span className="text-sm">{section.author}</span>
                        </div>
                      )}
                      {section.tripType && (
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {section.tripType.charAt(0).toUpperCase() + section.tripType.slice(1)} Trip
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {editingId !== section.id && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(section)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-800' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Edit2 size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(section.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-800' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Trash2 size={18} className={darkMode ? 'text-red-400' : 'text-red-500'} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Section Content */}
                <div className="p-6">
                  {editingId === section.id ? (
                    // Edit Mode
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'bg-gray-50 border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Description
                        </label>
                        <textarea
                          value={editForm.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows="3"
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'bg-gray-50 border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Date Range & Budget */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Date Range
                          </label>
                          <div className="relative">
                            <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} size={18} />
                            <input
                              type="text"
                              value={editForm.dateRange}
                              onChange={(e) => handleInputChange('dateRange', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                darkMode 
                                  ? 'bg-gray-800 border-gray-700 text-white' 
                                  : 'bg-gray-50 border-gray-300 text-gray-900'
                              }`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Budget
                          </label>
                          <div className="relative">
                            <DollarSign className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} size={18} />
                            <input
                              type="text"
                              value={editForm.budget}
                              onChange={(e) => handleInputChange('budget', e.target.value)}
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                darkMode 
                                  ? 'bg-gray-800 border-gray-700 text-white' 
                                  : 'bg-gray-50 border-gray-300 text-gray-900'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Author */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Author (Optional)
                        </label>
                        <div className="relative">
                          <UserIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`} size={18} />
                          <input
                            type="text"
                            value={editForm.author}
                            onChange={(e) => handleInputChange('author', e.target.value)}
                            placeholder="e.g., Genuine Whale, Authorized Panther"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              darkMode 
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Icon & Color Selection */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-3 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Icon
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {icons.map((iconItem, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleInputChange('icon', iconItem.icon)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                                  editForm.icon === iconItem.icon
                                    ? 'bg-blue-500 text-white'
                                    : darkMode
                                      ? 'bg-gray-800 hover:bg-gray-700'
                                      : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                {iconItem.icon}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-3 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Color
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {colors.map((colorItem) => (
                              <button
                                key={colorItem.name}
                                type="button"
                                onClick={() => handleInputChange('color', colorItem.name)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  editForm.color === colorItem.name
                                    ? 'ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-gray-400'
                                    : ''
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full ${colorItem.class}`}></div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Edit Action Buttons */}
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          onClick={handleCancel}
                          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                            darkMode 
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <X size={18} className="inline mr-2" />
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(section.id)}
                          className="px-6 py-3 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                          <Save size={18} className="inline mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-4">
                      <p className={`text-lg leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {section.description}
                      </p>
                      
                      <div className={`flex flex-wrap gap-6 pt-4 border-t ${
                        darkMode ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <Calendar className={darkMode ? 'text-gray-500' : 'text-gray-400'} size={20} />
                          <div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Date Range
                            </div>
                            <div className="font-medium">{section.dateRange}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <DollarSign className={darkMode ? 'text-gray-500' : 'text-gray-400'} size={20} />
                          <div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Budget
                            </div>
                            <div className="font-medium">{section.budget}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm === section.id && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className={`rounded-2xl p-6 max-w-md w-full ${
                    darkMode ? 'bg-gray-900' : 'bg-white'
                  }`}>
                    <h3 className="text-xl font-bold mb-2">Delete Section</h3>
                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Are you sure you want to delete "{section.title}"? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Section Button */}
        <div className="text-center">
          <button
            onClick={addNewSection}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 text-gray-300 hover:text-white' 
                : 'bg-white border border-gray-200 hover:border-blue-400 text-gray-700 hover:text-blue-600 shadow-xl'
            }`}
          >
            <Plus size={24} />
            {tripData ? 'Add Extra Day' : 'Add another Section'}
          </button>
        </div>
      </main>

      {/* Stats Footer */}
      <footer className={`mt-16 py-8 border-t ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {sections.length}
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Sections
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                ${calculateTotalBudget().toLocaleString()}
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Budget
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {sections.filter(s => s.author).length}
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sections with Authors
              </div>
            </div>
          </div>
          {tripData && (
            <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This itinerary was generated for your {tripData.tripType} trip to {tripData.destination} with a budget of ${tripData.budget} for {tripData.travelers} traveler{tripData.travelers !== '1' ? 's' : ''}.
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default TripSections;