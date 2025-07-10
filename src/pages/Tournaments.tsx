import React, { useState } from 'react';
import { Trophy, Calendar, Users, MapPin, Star, DollarSign, Clock, Filter, CheckCircle, MessageCircle, X, Send, Award, Target, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const Tournaments = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming');
  const [filters, setFilters] = useState({
    skillLevel: '',
    location: '',
    prizeRange: ''
  });
  const [joinedTournaments, setJoinedTournaments] = useState<Set<number>>(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState<number | null>(null);
  const [showTournamentLobby, setShowTournamentLobby] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<number, Array<{id: number, user: string, message: string, time: string}>>>({});
  const [newMessage, setNewMessage] = useState('');

  const tournaments = {
    upcoming: [
      {
        id: 1,
        name: 'Summer Championship 2024',
        date: '2024-07-15',
        endDate: '2024-07-16',
        location: 'Central Sports Complex',
        address: '123 Sports Ave, Downtown',
        skillLevel: 'All Levels',
        participants: 96,
        maxParticipants: 128,
        prizePool: '$5,000',
        entryFee: '$50',
        registrationDeadline: '2024-07-10',
        description: 'The biggest pickleball tournament of the summer! Multiple divisions for all skill levels with professional referees.',
        image: 'https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=600',
        organizer: 'PickleBall Pro League',
        status: 'open',
        format: 'Double Elimination',
        courts: 8,
        rules: [
          'USAPA Official Rules Apply',
          'Best of 3 games to 11 points',
          'Win by 2 points',
          'Professional referees for all matches'
        ],
        schedule: [
          { day: 'Day 1', events: 'Registration & Pool Play' },
          { day: 'Day 2', events: 'Elimination Rounds & Finals' }
        ],
        registeredPlayers: [
          { name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Intermediate' },
          { name: 'Mike Chen', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Advanced' },
          { name: 'Emily Rodriguez', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Intermediate' }
        ]
      },
      {
        id: 2,
        name: 'Beginner Friendly Cup',
        date: '2024-08-05',
        endDate: '2024-08-05',
        location: 'Community Center Courts',
        address: '456 Community Rd, Westside',
        skillLevel: 'Beginner',
        participants: 32,
        maxParticipants: 64,
        prizePool: '$1,500',
        entryFee: '$25',
        registrationDeadline: '2024-08-01',
        description: 'Perfect tournament for beginners to get competitive experience in a supportive environment with coaching tips.',
        image: 'https://images.pexels.com/photos/6224456/pexels-photo-6224456.jpeg?auto=compress&cs=tinysrgb&w=600',
        organizer: 'Community Sports Club',
        status: 'open',
        format: 'Round Robin',
        courts: 4,
        rules: [
          'Modified rules for beginners',
          'Games to 11 points, win by 2',
          'Coaching allowed between games',
          'Focus on fun and learning'
        ],
        schedule: [
          { day: 'Day 1', events: 'Skills Clinic & Tournament Play' }
        ],
        registeredPlayers: [
          { name: 'Alex Kim', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Beginner' },
          { name: 'Lisa Park', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Beginner' }
        ]
      },
      {
        id: 3,
        name: 'Pro League Finals',
        date: '2024-09-10',
        endDate: '2024-09-12',
        location: 'Elite Sports Arena',
        address: '789 Elite Blvd, Uptown',
        skillLevel: 'Advanced',
        participants: 16,
        maxParticipants: 32,
        prizePool: '$15,000',
        entryFee: '$100',
        registrationDeadline: '2024-09-05',
        description: 'The ultimate championship for advanced players. Invitation only for top-rated players with live streaming.',
        image: 'https://images.pexels.com/photos/6224458/pexels-photo-6224458.jpeg?auto=compress&cs=tinysrgb&w=600',
        organizer: 'Elite Pickleball Association',
        status: 'invitation',
        format: 'Single Elimination',
        courts: 6,
        rules: [
          'Professional tournament rules',
          'Best of 5 games to 11 points',
          'Professional referees and line judges',
          'Live streaming available'
        ],
        schedule: [
          { day: 'Day 1', events: 'Opening Ceremony & Round 1' },
          { day: 'Day 2', events: 'Quarterfinals & Semifinals' },
          { day: 'Day 3', events: 'Finals & Awards Ceremony' }
        ],
        registeredPlayers: [
          { name: 'James Brown', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Pro' },
          { name: 'Sophie Taylor', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150', division: 'Pro' }
        ]
      }
    ],
    ongoing: [
      {
        id: 4,
        name: 'Spring Regional Tournament',
        date: '2024-01-10',
        endDate: '2024-01-12',
        location: 'Metro Sports Complex',
        participants: 96,
        currentRound: 'Quarterfinals',
        status: 'live'
      }
    ],
    completed: [
      {
        id: 5,
        name: 'Winter Championship 2023',
        date: '2023-12-15',
        endDate: '2023-12-17',
        location: 'Downtown Arena',
        participants: 128,
        winner: 'Sarah Johnson & Mike Chen',
        prizeAwarded: '$3,000',
        status: 'completed'
      }
    ]
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleJoinTournament = (tournamentId: number) => {
    setShowConfirmDialog(tournamentId);
  };

  const confirmJoinTournament = (tournamentId: number) => {
    setJoinedTournaments(prev => new Set([...prev, tournamentId]));
    setShowConfirmDialog(null);
    setShowTournamentLobby(tournamentId);
    
    // Initialize chat for this tournament
    if (!chatMessages[tournamentId]) {
      setChatMessages(prev => ({
        ...prev,
        [tournamentId]: [
          { id: 1, user: 'Tournament Director', message: 'Welcome to the tournament! Please review the rules and schedule.', time: '9:00 AM' },
          { id: 2, user: 'Sarah Johnson', message: 'Excited to compete! Good luck everyone!', time: '9:15 AM' }
        ]
      }));
    }
  };

  const sendMessage = (tournamentId: number) => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => ({
      ...prev,
      [tournamentId]: [...(prev[tournamentId] || []), message]
    }));
    
    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'invitation': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'all levels': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/6224458/pexels-photo-6224458.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Tournament action"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="px-8">
              <h1 className="text-4xl font-bold text-white mb-2">Tournaments</h1>
              <p className="text-xl text-gray-200">Compete in exciting pickleball tournaments and win prizes</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'upcoming', label: 'Upcoming', count: tournaments.upcoming.length, icon: Calendar },
                { key: 'ongoing', label: 'Ongoing', count: tournaments.ongoing.length, icon: Zap },
                { key: 'completed', label: 'Completed', count: tournaments.completed.length, icon: Award }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-yellow-400 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label} ({tab.count})</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Filters for upcoming tournaments */}
          {activeTab === 'upcoming' && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Filter Tournaments</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    <option value="downtown">Downtown</option>
                    <option value="westside">Westside</option>
                    <option value="uptown">Uptown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prize Range</label>
                  <select
                    name="prizeRange"
                    value={filters.prizeRange}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">Any Prize</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="over-5000">Over $5,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tournament Content */}
        <div className="space-y-6">
          {activeTab === 'upcoming' && (
            <>
              {tournaments.upcoming.map((tournament) => (
                <div key={tournament.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative">
                      <img
                        src={tournament.image}
                        alt={tournament.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tournament.status)}`}>
                          {tournament.status === 'open' ? 'Open Registration' : 'Invitation Only'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillLevelColor(tournament.skillLevel)}`}>
                          {tournament.skillLevel}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{tournament.name}</h3>
                          <p className="text-gray-600 mb-3">{tournament.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-600">{tournament.prizePool}</div>
                          <div className="text-sm text-gray-500">Prize Pool</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-2" />
                          <div>
                            <p className="text-sm">Date</p>
                            <p className="font-medium text-gray-900">
                              {new Date(tournament.date).toLocaleDateString()}
                              {tournament.endDate !== tournament.date && 
                                ` - ${new Date(tournament.endDate).toLocaleDateString()}`
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-2" />
                          <div>
                            <p className="text-sm">Location</p>
                            <p className="font-medium text-gray-900">{tournament.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-2" />
                          <div>
                            <p className="text-sm">Participants</p>
                            <p className="font-medium text-gray-900">
                              {tournament.participants}/{tournament.maxParticipants}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Target className="w-5 h-5 mr-2" />
                          <div>
                            <p className="text-sm">Format</p>
                            <p className="font-medium text-gray-900">{tournament.format}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Entry Fee: {tournament.entryFee}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Register by: {new Date(tournament.registrationDeadline).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          {joinedTournaments.has(tournament.id) ? (
                            <>
                              <button
                                onClick={() => setShowTournamentLobby(tournament.id)}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
                              >
                                <CheckCircle className="w-5 h-5" />
                                <span>Registered</span>
                              </button>
                              <button
                                onClick={() => setShowTournamentLobby(tournament.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
                              >
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleJoinTournament(tournament.id)}
                              disabled={tournament.status === 'invitation'}
                              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                                tournament.status === 'invitation'
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-yellow-400 to-green-600 text-white hover:from-yellow-500 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                              }`}
                            >
                              <Trophy className="w-5 h-5" />
                              <span>{tournament.status === 'invitation' ? 'Invitation Only' : 'Join Tournament'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'ongoing' && (
            <>
              {tournaments.ongoing.map((tournament) => (
                <div key={tournament.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{tournament.name}</h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Zap className="w-4 h-4" />
                      <span>Live</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Round</p>
                      <p className="font-medium text-gray-900">{tournament.currentRound}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Participants</p>
                      <p className="font-medium text-gray-900">{tournament.participants}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{tournament.location}</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    View Bracket
                  </button>
                </div>
              ))}
            </>
          )}

          {activeTab === 'completed' && (
            <>
              {tournaments.completed.map((tournament) => (
                <div key={tournament.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{tournament.name}</h3>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Winner</p>
                      <p className="font-medium text-gray-900">{tournament.winner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Prize Awarded</p>
                      <p className="font-medium text-gray-900">{tournament.prizeAwarded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Participants</p>
                      <p className="font-medium text-gray-900">{tournament.participants}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(tournament.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    View Results
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <img
                  src="https://images.pexels.com/photos/6224458/pexels-photo-6224458.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Tournament"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Join Tournament</h3>
                <p className="text-gray-600">
                  Are you sure you want to register for this tournament? You'll gain access to tournament chat, schedule, and bracket updates.
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
                  onClick={() => confirmJoinTournament(showConfirmDialog)}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-green-700 transition-all duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tournament Lobby */}
        {showTournamentLobby && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex h-[85vh]">
                {/* Tournament Details Sidebar */}
                <div className="w-1/3 bg-gray-50 p-6 border-r overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Tournament Hub</h3>
                    <button
                      onClick={() => setShowTournamentLobby(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {(() => {
                    const tournament = tournaments.upcoming.find(t => t.id === showTournamentLobby);
                    if (!tournament) return null;
                    
                    return (
                      <>
                        <img
                          src={tournament.image}
                          alt={tournament.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        
                        <h4 className="font-semibold text-gray-900 mb-2">{tournament.name}</h4>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(tournament.date).toLocaleDateString()}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {tournament.location}
                          </p>
                          <p className="flex items-center">
                            <Trophy className="w-4 h-4 mr-2" />
                            {tournament.prizePool} Prize Pool
                          </p>
                        </div>
                        
                        {/* Tournament Rules */}
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Tournament Rules</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {tournament.rules.map((rule, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {rule}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Schedule */}
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Schedule</h5>
                          <div className="space-y-2">
                            {tournament.schedule.map((item, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg">
                                <p className="font-medium text-gray-900">{item.day}</p>
                                <p className="text-sm text-gray-600">{item.events}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Registered Players */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">
                            Participants ({tournament.participants + 1}/{tournament.maxParticipants})
                          </h5>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {tournament.registeredPlayers.map((player, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <img
                                  src={player.image}
                                  alt={player.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{player.name}</p>
                                  <p className="text-xs text-gray-500">{player.division}</p>
                                </div>
                              </div>
                            ))}
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">Y</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">You</p>
                                <p className="text-xs text-gray-500">Registered</p>
                              </div>
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
                      Tournament Chat
                    </h4>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {(chatMessages[showTournamentLobby] || []).map((msg) => (
                      <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.user === 'You' 
                            ? 'bg-yellow-400 text-gray-900' 
                            : msg.user === 'Tournament Director'
                            ? 'bg-blue-100 text-blue-900'
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
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(showTournamentLobby)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <button
                        onClick={() => sendMessage(showTournamentLobby)}
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

export default Tournaments;