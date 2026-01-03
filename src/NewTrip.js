import React, { useState } from 'react';
import { ChevronLeft, Calendar, MapPin, Compass, Search, Sparkles, User, ArrowRight } from 'lucide-react';

const NewTrip = () => {
  const [formData, setFormData] = useState({
    startDate1: '',
    place: '',
    startDate2: '',
    endDate: ''
  });

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800';
  };

  const suggestions = [
    { id: 1, title: "Tremendous Kangaroo", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=500", color: "bg-purple-600" },
    { id: 2, title: "Majestic Elephant", img: "https://images.unsplash.com/photo-1557406230-ceddd547a01b?w=500", color: "bg-blue-600" },
    { id: 3, title: "Golden Eagle", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500", color: "bg-indigo-600" },
    { id: 4, title: "Zealous Hedgehog", img: "https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=500", color: "bg-orange-800" },
    { id: 5, title: "Hidden Panther", img: "https://images.unsplash.com/photo-1516422275817-ad57881b28af?w=500", color: "bg-slate-700" },
    { id: 6, title: "Superb Coyote", img: "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?w=500", color: "bg-green-900" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 1. HEADER (Matches Dashboard) */}
      <nav className="w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Compass className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic leading-none">GlobalTrotter</span>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 p-0.5 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" className="w-full h-full object-cover rounded-full" alt="profile" />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        
        {/* 2. PAGE TITLE */}
        <div className="mb-10">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic border-b border-white/10 pb-4">
            Plan a new trip
          </h2>
        </div>

        {/* 3. TRIP FORM (Matches your exact layout) */}
        <div className="space-y-6 max-w-2xl mb-20">
          {[
            { id: 'startDate1', label: 'Start Date:', type: 'date', placeholder: '' },
            { id: 'place', label: 'Select a Place :', type: 'text', placeholder: 'Enter destination...' },
            { id: 'startDate2', label: 'Start Date:', type: 'date', placeholder: '' },
            { id: 'endDate', label: 'End Date:', type: 'date', placeholder: '' },
          ].map((field) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 group">
              <label className="text-xl font-medium tracking-tight opacity-90">{field.label}</label>
              <div className="md:col-span-2 relative">
                <input 
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border border-white/20 rounded-xl py-3 px-5 text-white focus:outline-none focus:border-blue-500 transition-all text-lg font-light placeholder:text-gray-600"
                  onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest text-sm flex items-center gap-3">
              Generate Itinerary <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 4. SUGGESTIONS SECTION */}
        <section>
          <div className="mb-12 border-b border-white/10 pb-4 flex items-center gap-3">
             <Sparkles className="text-blue-500" size={20} />
             <h3 className="text-xl font-bold tracking-tight italic">Suggestion for Places to Visit/Activities to preform</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {suggestions.map((item, idx) => (
              <div key={item.id} className="relative group cursor-pointer">
                
                {/* WIREFRAME LABEL POINTER (Matches Sketch) */}
                <div className={`absolute z-20 ${
                  idx === 0 ? '-top-6 -left-2' : 
                  idx === 3 ? 'top-1/2 -left-4' :
                  idx === 5 ? '-top-4 -right-2' : 
                  'top-0 left-1/2 -translate-x-1/2 -translate-y-4'
                }`}>
                   <div className="relative">
                      {/* Arrow tail/pointer logic */}
                      <div className={`absolute w-3 h-3 rotate-45 ${item.color} ${
                        idx === 0 ? 'top-6 left-4' : 
                        idx === 3 ? 'top-4 left-10' :
                        'top-6 left-1/2 -translate-x-1/2'
                      }`}></div>
                      <div className={`${item.color} text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl whitespace-nowrap uppercase tracking-widest border border-white/10`}>
                        {item.title}
                      </div>
                   </div>
                </div>

                {/* IMAGE CARD */}
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a] group-hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    onError={addDefaultSrc}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action (Optional Back Button) */}
      <button 
        onClick={() => window.history.back()}
        className="fixed bottom-10 left-10 w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-2xl backdrop-blur-lg"
      >
        <ChevronLeft size={24} />
      </button>

    </div>
  );
};

export default NewTrip;