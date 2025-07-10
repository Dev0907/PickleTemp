import React, { useState } from 'react';
import { Users, Shuffle, Target, Clock, TrendingUp } from 'lucide-react';

const Matchmaking = () => {
  const [players] = useState([
    { id: 1, name: 'Sarah Johnson', skill: 'intermediate', rating: 3.2, availability: 'available' },
    { id: 2, name: 'Mike Chen', skill: 'advanced', rating: 4.1, availability: 'available' },
    { id: 3, name: 'Lisa Rodriguez', skill: 'beginner', rating: 2.8, availability: 'available' },
    { id: 4, name: 'Tom Wilson', skill: 'intermediate', rating: 3.5, availability: 'busy' },
    { id: 5, name: 'Emily Davis', skill: 'advanced', rating: 4.3, availability: 'available' },
    { id: 6, name: 'David Kim', skill: 'beginner', rating: 2.5, availability: 'available' },
    { id: 7, name: 'Anna Martinez', skill: 'intermediate', rating: 3.0, availability: 'available' },
    { id: 8, name: 'James Brown', skill: 'advanced', rating: 4.5, availability: 'available' },
  ]);

  const [matches, setMatches] = useState<Array<{player1: any, player2: any}>>([]);
  const [selectedSkill, setSelectedSkill] = useState('all');

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateMatches = () => {
    const availablePlayers = players.filter(p => p.availability === 'available');
    const filteredPlayers = selectedSkill === 'all' 
      ? availablePlayers 
      : availablePlayers.filter(p => p.skill === selectedSkill);

    const newMatches = [];
    const usedPlayers = new Set();

    // Simple pairing algorithm - pair players with similar ratings
    const sortedPlayers = [...filteredPlayers].sort((a, b) => a.rating - b.rating);
    
    for (let i = 0; i < sortedPlayers.length - 1; i += 2) {
      if (!usedPlayers.has(sortedPlayers[i].id) && !usedPlayers.has(sortedPlayers[i + 1].id)) {
        newMatches.push({
          player1: sortedPlayers[i],
          player2: sortedPlayers[i + 1]
        });
        usedPlayers.add(sortedPlayers[i].id);
        usedPlayers.add(sortedPlayers[i + 1].id);
      }
    }

    setMatches(newMatches);
  };

  const filteredPlayers = selectedSkill === 'all' 
    ? players 
    : players.filter(p => p.skill === selectedSkill);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Matchmaking</h1>
        <p className="text-gray-600">AI-powered skill-based player pairing</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Skill:</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <button
            onClick={generateMatches}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Shuffle className="w-5 h-5" />
            <span>Generate Matches</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Players */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 text-green-600" />
            Available Players ({filteredPlayers.filter(p => p.availability === 'available').length})
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  player.availability === 'available'
                    ? 'border-green-200 bg-green-50 hover:border-green-300'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{player.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(player.skill)}`}>
                        {player.skill}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {player.rating}
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    player.availability === 'available' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Matches */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="mr-2 text-yellow-500" />
            Generated Matches ({matches.length})
          </h2>
          {matches.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shuffle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Click "Generate Matches" to create optimal pairings</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {matches.map((match, index) => (
                <div key={index} className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Match {index + 1}</h3>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      45 min
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{match.player1.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(match.player1.skill)}`}>
                          {match.player1.skill}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{match.player1.rating}</span>
                    </div>
                    <div className="text-center text-gray-400 text-sm">vs</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{match.player2.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(match.player2.skill)}`}>
                          {match.player2.skill}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{match.player2.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                      Schedule Match
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;