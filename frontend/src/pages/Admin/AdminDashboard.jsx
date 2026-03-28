import React, { useState } from 'react';
import { MapPin, UserCheck, Activity } from 'lucide-react';

export default function AdminDashboard() {
  // Mock State: Ready to be replaced by backend data
  const [activeMRs, setActiveMRs] = useState([
    { id: 1, name: 'Sarah Connor', status: 'On Route', location: 'Downtown Clinic', completion: '4/8 Stops' },
    { id: 2, name: 'John Smith', status: 'Idle', location: 'HQ', completion: '0/5 Stops' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manager Command Center</h1>
        <p className="text-gray-500">Live fleet tracking and route assignment</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Activity} title="Active MRs" value="12" color="text-green-600" bg="bg-green-100" />
        <StatCard icon={MapPin} title="Clinics Visited Today" value="84" color="text-blue-600" bg="bg-blue-100" />
        <StatCard icon={UserCheck} title="Routes Completed" value="3" color="text-purple-600" bg="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: MR List & Assignments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 col-span-1">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Field Force Status</h2>
          <div className="space-y-3">
            {activeMRs.map((mr) => (
              <div key={mr.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center border border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">{mr.name}</p>
                  <p className="text-xs text-gray-500">{mr.location} • {mr.completion}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${mr.status === 'On Route' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                  {mr.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
            + Assign New Route
          </button>
        </div>

        {/* Right Column: The Live Map Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 col-span-1 lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Live Territory Map</h2>
          <div className="flex-1 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 font-medium">Google Maps API will render here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for stats
function StatCard({ icon: Icon, title, value, color, bg }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}