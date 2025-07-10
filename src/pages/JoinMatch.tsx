import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Star, Filter, Search, MessageCircle, Timer, CheckCircle, UserPlus, X, Send, Phone, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';

const JoinMatch = () => {
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    skillLevel: '',
    searchTerm: ''
  });

  const [joinedMatches, setJoinedMatches] = useState<Set<number>>(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState<number | null>(null);
  const [showMatchLobby, setShowMatchLobby] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<number, Array<{id: number, user: string, message: string, time: string}>>>({});
  const [newMessage, setNewMessage] = useState('');

  const [availableMatches] = useState([
    {
      id: 1,
      title: 'Morning Doubles Championship',
      date: '2024-01-15',
      time: '09:00 AM',
      duration: '1.5 hours',
      location: 'Elite Sports Arena',
      address: '123 Sports Ave, Alkapuri, Vadodara',
      skillLevel: 'Intermediate',
      playersNeeded: 1,
      totalPlayers: 4,
      organizer: 'Sarah Johnson',
      organizerImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Competitive doubles match with prize money. Looking for skilled intermediate players!',
      courtFee: '₹800 per person',
      image: 'https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=600',
      prizePool: '₹5,000',
      startTime: new Date('2024-01-15T09:00:00'),
      joinedPlayers: [
        { name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43210' },
        { name: 'Mike Chen', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43211' },
        { name: 'Lisa Park', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43212' }
      ]
    },
    {
      id: 2,
      title: 'Evening Social Play',
      date: '2024-01-15',
      time: '06:00 PM',
      duration: '1 hour',
      location: 'Community Center Courts',
      address: '456 Community Rd, Sayajigunj, Vadodara',
      skillLevel: 'Beginner',
      playersNeeded: 2,
      totalPlayers: 4,
      organizer: 'Mike Chen',
      organizerImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Casual singles practice session. Perfect for beginners looking to improve their game in a friendly environment.',
      courtFee: '₹500 per person',
      image: 'https://images.pexels.com/photos/6224456/pexels-photo-6224456.jpeg?auto=compress&cs=tinysrgb&w=600',
      startTime: new Date('2024-01-15T18:00:00'),
      joinedPlayers: [
        { name: 'Mike Chen', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43211' },
        { name: 'Emma Wilson', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43213' }
      ]
    },
    {
      id: 3,
      title: 'Advanced Training Session',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '2 hours',
      location: 'Elite Sports Arena',
      address: '789 Elite Blvd, Alkapuri, Vadodara',
      skillLevel: 'Advanced',
      playersNeeded: 1,
      totalPlayers: 6,
      organizer: 'Emily Rodriguez',
      organizerImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Intensive training session with professional coaching. Tournament preparation for advanced players.',
      courtFee: '₹1200 per person',
      image: 'https://images.pexels.com/photos/6224458/pexels-photo-6224458.jpeg?auto=compress&cs=tinysrgb&w=600',
      coaching: true,
      startTime: new Date('2024-01-16T10:00:00'),
      joinedPlayers: [
        { name: 'Emily Rodriguez', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43214' },
        { name: 'David Kim', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43215' },
        { name: 'Anna Martinez', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43216' },
        { name: 'James Brown', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43217' },
        { name: 'Sophie Taylor', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150', phone: '+91 98765 43218' }
      ]
    }
  ]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      case 'mixed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleJoinClick = (matchId: number) => {
    setShowConfirmDialog(matchId);
  };

  const confirmJoinMatch = (matchId: number) => {
    setJoinedMatches(prev => new Set([...prev, matchId]));
    setShowConfirmDialog(null);
    setShowMatchLobby(matchId);
    
    // Initialize chat for this match
    if (!chatMessages[matchId]) {
      setChatMessages(prev => ({
        ...prev,
        [matchId]: [
          { id: 1, user: 'System', message: 'Welcome to the match lobby! Feel free to introduce yourself.', time: '10:30 AM' },
          { id: 2, user: 'Sarah Johnson', message: 'Looking forward to a great game everyone!', time: '10:32 AM' }
        ]
      }));
    }
  };

  const sendMessage = (matchId: number) => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), message]
    }));
    
    setNewMessage('');
  };

  const getTimeUntilMatch = (startTime: Date) => {
    const now = new Date();
    const diff = startTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const filteredMatches = availableMatches.filter(match => {
    return (
      (!filters.date || match.date === filters.date) &&
      (!filters.location || match.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.skillLevel || match.skillLevel.toLowerCase() === filters.skillLevel.toLowerCase()) &&
      (!filters.searchTerm || 
        match.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        match.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        match.organizer.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Action Shot */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Pickleball players in action"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="px-8">
              <h1 className="text-4xl font-bold text-white mb-2">Join a Match</h1>
              <p className="text-xl text-gray-200">Find and join exciting pickleball matches in your area</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Matches</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Search matches..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Enter location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
              <select
                name="skillLevel"
                value={filters.skillLevel}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-6">
          {filteredMatches.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <img
                src="https://images.pexels.com/photos/6224456/pexels-photo-6224456.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="No matches"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 opacity-50"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new matches.</p>
            </div>
          ) : (
            filteredMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  {/* Match Image */}
                  <div className="md:w-1/3 relative">
                    <img
                      src={match.image}
                      alt={match.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    {match.prizePool && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold text-sm">
                        Prize: {match.prizePool}
                      </div>
                    )}
                    {match.coaching && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                        Coaching
                      </div>
                    )}
                  </div>

                  {/* Match Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{match.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(match.date).toLocaleDateString()} at {match.time}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {match.duration}
                          </span>
                          <span className="flex items-center">
                            <Timer className="w-4 h-4 mr-1" />
                            Starts in {getTimeUntilMatch(match.startTime)}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSkillLevelColor(match.skillLevel)}`}>
                        {match.skillLevel}
                      </span>
                    </div>
                    
                    {/* Organizer Info */}
                    <div className="flex items-center mb-4">
                      <img
                        src={match.organizerImage}
                        alt={match.organizer}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Organized by {match.organizer}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">5.0 rating</span>
                        </div>
                      </div>
                    </div>

                    {/* Location and Players */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="font-medium text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {match.location}
                        </p>
                        <p className="text-sm text-gray-500">{match.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Players</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {match.joinedPlayers.slice(0, 3).map((player, index) => (
                              <img
                                key={index}
                                src={player.image}
                                alt={player.name}
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                            {match.joinedPlayers.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                                +{match.joinedPlayers.length - 3}
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">
                            {match.totalPlayers - match.playersNeeded}/{match.totalPlayers} joined
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{match.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">
                        {match.courtFee}
                      </div>
                      <div className="flex space-x-3">
                        {joinedMatches.has(match.id) ? (
                          <>
                            <button
                              onClick={() => setShowMatchLobby(match.id)}
                              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
                            >
                              <CheckCircle className="w-5 h-5" />
                              <span>Joined</span>
                            </button>
                            <button
                              onClick={() => setShowMatchLobby(match.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
                            >
                              <MessageCircle className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleJoinClick(match.id)}
                            className="bg-gradient-to-r from-yellow-400 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                          >
                            <UserPlus className="w-5 h-5" />
                            <span>Join Match</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <img
                  src="https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Confirm join"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Join Match</h3>
                <p className="text-gray-600">
                  Are you sure you want to join this match? You'll be able to chat with other players and receive match updates.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmJoinMatch(showConfirmDialog)}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-green-700 transition-all duration-200"
                >
                  Join Match
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Match Lobby */}
        {showMatchLobby && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex h-[80vh]">
                {/* Match Details Sidebar */}
                <div className="w-1/3 bg-gray-50 p-6 border-r">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Match Lobby</h3>
                    <button
                      onClick={() => setShowMatchLobby(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {(() => {
                    const match = availableMatches.find(m => m.id === showMatchLobby);
                    if (!match) return null;
                    
                    return (
                      <>
                        <img
                          src={match.image}
                          alt={match.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        
                        <h4 className="font-semibold text-gray-900 mb-2">{match.title}</h4>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(match.date).toLocaleDateString()} at {match.time}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {match.location}
                          </p>
                          <p className="flex items-center">
                            <Timer className="w-4 h-4 mr-2" />
                            Starts in {getTimeUntilMatch(match.startTime)}
                          </p>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-center space-x-2 text-yellow-800">
                            <Timer className="w-5 h-5" />
                            <span className="font-semibold">
                              {getTimeUntilMatch(match.startTime)} until match
                            </span>
                          </div>
                        </div>
                        
                        <h5 className="font-semibold text-gray-900 mb-3">Players ({match.joinedPlayers.length + 1}/{match.totalPlayers})</h5>
                        <div className="space-y-2">
                          {match.joinedPlayers.map((player, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <img
                                src={player.image}
                                alt={player.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{player.name}</p>
                              </div>
                              <div className="flex space-x-1">
                                <button className="p-1 text-gray-400 hover:text-green-600">
                                  <Phone className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-blue-600">
                                  <Mail className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">Y</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">You</p>
                            </div>
                            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Joined
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                {/* Chat Section */}
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Match Chat
                    </h4>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {(chatMessages[showMatchLobby] || []).map((msg) => (
                      <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.user === 'You' 
                            ? 'bg-yellow-400 text-gray-900' 
                            : msg.user === 'System'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          {msg.user !== 'You' && (
                            <p className="text-xs font-semibold mb-1">{msg.user}</p>
                          )}
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-75 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(showMatchLobby)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <button
                        onClick={() => sendMessage(showMatchLobby)}
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinMatch;