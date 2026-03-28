import React, { useState } from 'react';
import { Navigation, CheckCircle, MapPin } from 'lucide-react';

export default function MRDashboard() {
  const [isTracking, setIsTracking] = useState(false);
  
  // Mock Itinerary Data
  const [itinerary, setItinerary] = useState([
    { id: 1, clinic: 'City Hospital', doctor: 'Dr. Adams', status: 'pending', address: '123 Main St' },
    { id: 2, clinic: 'Westside Clinic', doctor: 'Dr. Baker', status: 'pending', address: '456 Oak Ave' },
  ]);

  const toggleTracking = () => {
    // In the future, this will trigger the Geolocation API and WebSockets
    setIsTracking(!isTracking);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">My Daily Route</h1>
        <p className="text-sm text-gray-500 mb-6">Oct 24 • 2 Stops Remaining</p>
        
        <button 
          onClick={toggleTracking}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center space-x-2 ${
            isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span>{isTracking ? 'Stop Tracking & End Day' : 'Start Day & Begin Tracking'}</span>
        </button>
        
        {isTracking && (
          <div className="mt-3 text-xs text-green-600 animate-pulse flex items-center justify-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Live location broadcasting to HQ...</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-gray-700 px-1">Today's Itinerary</h2>
        {itinerary.map((stop, index) => (
          <div key={stop.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{stop.clinic}</h3>
                <p className="text-sm text-gray-600">{stop.doctor}</p>
              </div>
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-medium">Stop {index + 1}</span>
            </div>
            
            <p className="text-xs text-gray-500 flex items-center mb-4 mt-1">
              <MapPin className="w-3 h-3 mr-1" /> {stop.address}
            </p>

            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
                <Navigation className="w-4 h-4 mr-2" /> Navigate
              </button>
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors">
                <CheckCircle className="w-4 h-4 mr-2" /> Check-In
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}