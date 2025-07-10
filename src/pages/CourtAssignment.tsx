import React, { useState } from 'react';
import { MapPin, Clock, Users, CheckCircle, XCircle, Settings } from 'lucide-react';

const CourtAssignment = () => {
  const [courts, setCourts] = useState([
    { id: 1, name: 'Court 1', status: 'occupied', currentMatch: 'Sarah Johnson vs Mike Chen', endTime: '10:30', nextMatch: 'Lisa Rodriguez vs David Kim' },
    { id: 2, name: 'Court 2', status: 'available', currentMatch: null, endTime: null, nextMatch: 'Emily Davis vs James Brown' },
    { id: 3, name: 'Court 3', status: 'occupied', currentMatch: 'Anna Martinez vs Tom Wilson', endTime: '11:00', nextMatch: null },
    { id: 4, name: 'Court 4', status: 'maintenance', currentMatch: null, endTime: null, nextMatch: null },
    { id: 5, name: 'Court 5', status: 'available', currentMatch: null, endTime: null, nextMatch: null },
    { id: 6, name: 'Court 6', status: 'occupied', currentMatch: 'Mike Chen vs Emily Davis', endTime: '10:45', nextMatch: 'Sarah Johnson vs Lisa Rodriguez' },
    { id: 7, name: 'Court 7', status: 'available', currentMatch: null, endTime: null, nextMatch: null },
    { id: 8, name: 'Court 8', status: 'reserved', currentMatch: null, endTime: null, nextMatch: 'Tournament Setup' },
  ]);

  const [pendingMatches] = useState([
    { id: 1, players: 'John Doe vs Jane Smith', skillLevel: 'intermediate', duration: '45 min', priority: 'high' },
    { id: 2, players: 'Bob Wilson vs Mary Johnson', skillLevel: 'beginner', duration: '30 min', priority: 'medium' },
    { id: 3, players: 'Alex Chen vs Lisa Davis', skillLevel: 'advanced', duration: '60 min', priority: 'low' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'occupied': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'maintenance': return <Settings className="w-5 h-5 text-yellow-600" />;
      case 'reserved': return <Clock className="w-5 h-5 text-blue-600" />;
      default: return <MapPin className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const assignCourt = (courtId: number, matchId: number) => {
    // Logic to assign a match to a court
    console.log(`Assigning match ${matchId} to court ${courtId}`);
  };

  const changeCourtStatus = (courtId: number, newStatus: string) => {
    setCourts(courts.map(court => 
      court.id === courtId 
        ? { ...court, status: newStatus, currentMatch: newStatus === 'available' ? null : court.currentMatch }
        : court
    ));
  };

  const availableCourts = courts.filter(court => court.status === 'available').length;
  const occupiedCourts = courts.filter(court => court.status === 'occupied').length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Court Assignment</h1>
        <p className="text-gray-600">Manage court allocations and match assignments</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">{availableCourts}</h3>
          <p className="text-gray-600">Available</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">{occupiedCourts}</h3>
          <p className="text-gray-600">Occupied</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Settings className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">{courts.filter(c => c.status === 'maintenance').length}</h3>
          <p className="text-gray-600">Maintenance</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">{pendingMatches.length}</h3>
          <p className="text-gray-600">Pending Matches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courts Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="mr-2 text-green-600" />
            Court Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courts.map((court) => (
              <div
                key={court.id}
                className={`p-4 rounded-lg border-2 ${getStatusColor(court.status)} hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{court.name}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(court.status)}
                    <span className="text-sm font-medium capitalize">{court.status}</span>
                  </div>
                </div>
                
                {court.currentMatch && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-1">Current Match:</p>
                    <p className="font-medium text-gray-800">{court.currentMatch}</p>
                    {court.endTime && (
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Ends at {court.endTime}
                      </p>
                    )}
                  </div>
                )}
                
                {court.nextMatch && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-1">Next Match:</p>
                    <p className="font-medium text-gray-800">{court.nextMatch}</p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  {court.status === 'available' && (
                    <button
                      onClick={() => changeCourtStatus(court.id, 'maintenance')}
                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors duration-200"
                    >
                      Maintenance
                    </button>
                  )}
                  {court.status === 'maintenance' && (
                    <button
                      onClick={() => changeCourtStatus(court.id, 'available')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                    >
                      Available
                    </button>
                  )}
                  {court.status === 'occupied' && (
                    <button
                      onClick={() => changeCourtStatus(court.id, 'available')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                    >
                      Free Up
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Matches */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 text-yellow-500" />
            Pending Matches
          </h2>
          <div className="space-y-4">
            {pendingMatches.map((match) => (
              <div
                key={match.id}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{match.players}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(match.priority)}`}>
                    {match.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <p>Skill: {match.skillLevel}</p>
                  <p>Duration: {match.duration}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Assign to court:</p>
                  <div className="flex flex-wrap gap-2">
                    {courts
                      .filter(court => court.status === 'available')
                      .map((court) => (
                        <button
                          key={court.id}
                          onClick={() => assignCourt(court.id, match.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                        >
                          {court.name}
                        </button>
                      ))}
                  </div>
                  {availableCourts === 0 && (
                    <p className="text-sm text-gray-500 italic">No courts available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtAssignment;