import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Filter, UserPlus } from 'lucide-react';

const JoinMatch: React.FC = () => {
  const [filters, setFilters] = useState({
    level: '',
    date: '',
    location: ''
  });

  const matches = [
    {
      id: 1,
      title: "Weekend Doubles Match",
      organizer: "John Smith",
      date: "2025-02-15",
      time: "10:00 AM",
      venue: "Central Sports Complex, Court 1",
      level: "Intermediate",
      maxPlayers: 4,
      currentPlayers: 2,
      description: "Looking for 2 more players for a fun doubles match. All skill levels welcome!"
    },
    {
      id: 2,
      title: "Morning Singles Practice",
      organizer: "Sarah Johnson",
      date: "2025-02-16",
      time: "08:00 AM",
      venue: "Community Center Courts",
      level: "Advanced",
      maxPlayers: 2,
      currentPlayers: 1,
      description: "Competitive singles match for advanced players."
    },
    {
      id: 3,
      title: "Beginner Friendly Match",
      organizer: "Mike Wilson",
      date: "2025-02-17",
      time: "06:00 PM",
      venue: "Local Recreation Center",
      level: "Beginner",
      maxPlayers: 4,
      currentPlayers: 3,
      description: "Perfect for new players to learn and have fun!"
    },
    {
      id: 4,
      title: "Pro Training Session",
      organizer: "Elite Academy",
      date: "2025-02-18",
      time: "07:00 AM",
      venue: "Professional Sports Arena",
      level: "Professional",
      maxPlayers: 6,
      currentPlayers: 4,
      description: "High-intensity training session for professional players."
    }
  ];

  const filteredMatches = matches.filter(match => {
    return (
      (filters.level === '' || match.level === filters.level) &&
      (filters.date === '' || match.date === filters.date) &&
      (filters.location === '' || match.venue.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const handleJoinRequest = (matchId: number) => {
    alert(`Join request sent for match ${matchId}. The organizer will review your request.`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800';
      case 'Professional':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-4">Join Match</h1>
          <p className="text-lg text-gray-600">Find and join exciting pickleball matches in your area</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-ocean-teal" />
            <h2 className="text-xl font-semibold text-deep-navy">Filter Matches</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-navy mb-2">Skill Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({...filters, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy mb-2">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-navy mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                placeholder="Search by venue..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
              />
            </div>
          </div>
        </div>

        {/* Match List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMatches.map((match) => (
            <div key={match.id} className="bg-sky-mist rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-deep-navy mb-1">{match.title}</h3>
                  <p className="text-gray-600">Organized by {match.organizer}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(match.level)}`}>
                  {match.level}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4" />
                  <span>{match.currentPlayers}/{match.maxPlayers} players</span>
                </div>
              </div>

              {match.description && (
                <p className="text-gray-600 mb-4 text-sm">{match.description}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 min-w-[100px]">
                    <div 
                      className="bg-ocean-teal h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(match.currentPlayers / match.maxPlayers) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {match.maxPlayers - match.currentPlayers} spots left
                  </span>
                </div>
                
                <button
                  onClick={() => handleJoinRequest(match.id)}
                  disabled={match.currentPlayers >= match.maxPlayers}
                  className={`ml-4 px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                    match.currentPlayers >= match.maxPlayers
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-lemon-zest text-deep-navy hover:bg-yellow-400'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  {match.currentPlayers >= match.maxPlayers ? 'Full' : 'Request to Join'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more matches.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinMatch;