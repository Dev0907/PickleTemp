import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Users, DollarSign, Filter } from 'lucide-react';

const JoinTournament: React.FC = () => {
  const [filters, setFilters] = useState({
    level: '',
    date: '',
    fee: ''
  });

  const tournaments = [
    {
      id: 1,
      name: "Summer Championship 2025",
      organizer: "PicklePro Sports Club",
      date: "2025-02-15",
      time: "09:00 AM",
      location: "Central Sports Complex",
      fee: 500,
      level: "Advanced",
      maxTeams: 32,
      registeredTeams: 18
    },
    {
      id: 2,
      name: "Beginner's Cup",
      organizer: "Community Center",
      date: "2025-02-20",
      time: "10:00 AM",
      location: "Local Recreation Center",
      fee: 200,
      level: "Beginner",
      maxTeams: 16,
      registeredTeams: 8
    },
    {
      id: 3,
      name: "Pro League Tournament",
      organizer: "Elite Pickleball Academy",
      date: "2025-02-25",
      time: "08:00 AM",
      location: "Professional Sports Arena",
      fee: 1000,
      level: "Professional",
      maxTeams: 24,
      registeredTeams: 20
    }
  ];

  const filteredTournaments = tournaments.filter(tournament => {
    return (
      (filters.level === '' || tournament.level === filters.level) &&
      (filters.date === '' || tournament.date === filters.date) &&
      (filters.fee === '' || 
        (filters.fee === 'free' && tournament.fee === 0) ||
        (filters.fee === 'low' && tournament.fee > 0 && tournament.fee <= 300) ||
        (filters.fee === 'medium' && tournament.fee > 300 && tournament.fee <= 700) ||
        (filters.fee === 'high' && tournament.fee > 700)
      )
    );
  });

  const handleJoinTournament = (tournamentId: number) => {
    alert(`Joining tournament ${tournamentId}. Registration form would open here.`);
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-4">Join Tournament</h1>
          <p className="text-lg text-gray-600">Find and join exciting pickleball tournaments</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-ocean-teal" />
            <h2 className="text-xl font-semibold text-deep-navy">Filter Tournaments</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-navy mb-2">Level</label>
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
              <label className="block text-sm font-medium text-deep-navy mb-2">Entry Fee</label>
              <select
                value={filters.fee}
                onChange={(e) => setFilters({...filters, fee: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
              >
                <option value="">All Fees</option>
                <option value="free">Free</option>
                <option value="low">₹1 - ₹300</option>
                <option value="medium">₹301 - ₹700</option>
                <option value="high">₹700+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tournament List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTournaments.map((tournament) => (
            <div key={tournament.id} className="bg-sky-mist rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-lemon-zest" />
                  <div>
                    <h3 className="text-xl font-bold text-deep-navy">{tournament.name}</h3>
                    <p className="text-gray-600">by {tournament.organizer}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tournament.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  tournament.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  tournament.level === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tournament.level}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(tournament.date).toLocaleDateString()} at {tournament.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  <span>{tournament.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  <span>₹{tournament.fee} entry fee</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4" />
                  <span>{tournament.registeredTeams}/{tournament.maxTeams} teams registered</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div 
                    className="bg-ocean-teal h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(tournament.registeredTeams / tournament.maxTeams) * 100}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => handleJoinTournament(tournament.id)}
                  disabled={tournament.registeredTeams >= tournament.maxTeams}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    tournament.registeredTeams >= tournament.maxTeams
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-lemon-zest text-deep-navy hover:bg-yellow-400'
                  }`}
                >
                  {tournament.registeredTeams >= tournament.maxTeams ? 'Full' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tournaments found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more tournaments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinTournament;