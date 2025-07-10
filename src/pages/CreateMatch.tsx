import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Plus, DollarSign, Settings, Share2, MessageCircle, UserCheck, Target, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const CreateMatch = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '1',
    location: '',
    address: '',
    skillLevel: '',
    playersNeeded: '3',
    description: '',
    courtFee: '',
    isPrivate: false,
    scoringSystem: '11',
    matchRules: 'standard'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showHostView, setShowHostView] = useState(false);
  const [joinedPlayers, setJoinedPlayers] = useState([
    { id: 1, name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'confirmed' },
    { id: 2, name: 'Mike Chen', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', status: 'pending' }
  ]);
  const [inviteCode, setInviteCode] = useState('MATCH2024');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Match title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.skillLevel) newErrors.skillLevel = 'Skill level is required';
    if (!formData.playersNeeded) newErrors.playersNeeded = 'Number of players needed is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    // Validate date is not in the past
    const selectedDate = new Date(formData.date + 'T' + formData.time);
    if (selectedDate <= new Date()) {
      newErrors.date = 'Date and time must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Match created:', formData);
      setShowHostView(true);
    } catch (error) {
      setErrors({ submit: 'Failed to create match. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const shareMatch = async () => {
    const matchUrl = `${window.location.origin}/join-match?code=${inviteCode}`;
    if (navigator.share) {
      await navigator.share({
        title: formData.title,
        text: `Join my pickleball match: ${formData.title}`,
        url: matchUrl
      });
    } else {
      await navigator.clipboard.writeText(matchUrl);
      alert('Match link copied to clipboard!');
    }
  };

  const suggestedLocations = [
    'Central Sports Complex',
    'Community Center Courts',
    'Elite Sports Arena',
    'Riverside Park Courts',
    'Downtown Courts'
  ];

  if (showHostView) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="relative mb-8 rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Match created"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-600/80 flex items-center">
              <div className="px-8">
                <h1 className="text-3xl font-bold text-white mb-2">Match Created Successfully!</h1>
                <p className="text-xl text-green-100">You're now hosting: {formData.title}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Match Management */}
            <div className="lg:col-span-2 space-y-6">
              {/* Match Details Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-blue-600" />
                    Match Management
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={shareMatch}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Match Details</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(formData.date).toLocaleDateString()} at {formData.time}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Duration: {formData.duration} hour{formData.duration !== '1' ? 's' : ''}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {formData.location}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2" />
                        {formData.skillLevel} level
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Match Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Scoring System</label>
                        <select
                          name="scoringSystem"
                          value={formData.scoringSystem}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="11">First to 11 points</option>
                          <option value="15">First to 15 points</option>
                          <option value="21">First to 21 points</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Match Rules</label>
                        <select
                          name="matchRules"
                          value={formData.matchRules}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="standard">Standard USAPA Rules</option>
                          <option value="recreational">Recreational Rules</option>
                          <option value="tournament">Tournament Rules</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Court Assignment */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    Court Assignment
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Court 3</p>
                        <p className="text-sm text-gray-600">{formData.location}</p>
                      </div>
                      <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                        Change Court
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Roster */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-purple-600" />
                  Player Roster ({joinedPlayers.length + 1}/{parseInt(formData.playersNeeded) + 1})
                </h2>

                <div className="space-y-4">
                  {/* Host */}
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-semibold">H</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">You (Host)</p>
                        <p className="text-sm text-gray-600">Match organizer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Host
                      </span>
                    </div>
                  </div>

                  {/* Joined Players */}
                  {joinedPlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-600">
                            {player.status === 'confirmed' ? 'Confirmed' : 'Pending confirmation'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          player.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {player.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                        <button className="text-gray-400 hover:text-red-600">
                          <span className="sr-only">Remove player</span>
                          ×
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Empty Slots */}
                  {Array.from({ length: parseInt(formData.playersNeeded) - joinedPlayers.length }, (_, i) => (
                    <div key={i} className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Waiting for player</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Invite Players */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Invite Players
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Match Code</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inviteCode}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(inviteCode)}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={shareMatch}
                    className="w-full bg-gradient-to-r from-yellow-400 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Share Match Link
                  </button>
                </div>
              </div>

              {/* Match Statistics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Stats</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-semibold text-gray-900">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Interested</span>
                    <span className="font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Joined</span>
                    <span className="font-semibold text-gray-900">{joinedPlayers.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Spots Left</span>
                    <span className="font-semibold text-green-600">
                      {parseInt(formData.playersNeeded) - joinedPlayers.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Send Reminder
                  </button>
                  <button className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                    Edit Match
                  </button>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Cancel Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/6224458/pexels-photo-6224458.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Create match"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-green-600/80 flex items-center">
            <div className="px-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create a Match</h1>
              <p className="text-xl text-blue-100">Organize a pickleball match and invite players to join</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Match Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Plus className="w-6 h-6 mr-2 text-green-600" />
                Match Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Match Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Morning Doubles Match, Evening Practice Session"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                        errors.time ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours)
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                    <option value="2.5">2.5 hours</option>
                    <option value="3">3 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level *
                  </label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none ${
                        errors.skillLevel ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select skill level</option>
                      <option value="beginner">Beginner (1.0 - 2.5)</option>
                      <option value="intermediate">Intermediate (3.0 - 3.5)</option>
                      <option value="advanced">Advanced (4.0 - 5.0+)</option>
                      <option value="mixed">Mixed (All levels welcome)</option>
                    </select>
                  </div>
                  {errors.skillLevel && <p className="text-red-500 text-sm mt-1">{errors.skillLevel}</p>}
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Location Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Central Sports Complex"
                    list="locations"
                  />
                  <datalist id="locations">
                    {suggestedLocations.map((location, index) => (
                      <option key={index} value={location} />
                    ))}
                  </datalist>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Court Fee (per person)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="courtFee"
                      value={formData.courtFee}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Sports Ave, Downtown, City, State 12345"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Player Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-600" />
                Player Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Players Needed *
                  </label>
                  <select
                    name="playersNeeded"
                    value={formData.playersNeeded}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.playersNeeded ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="1">1 player (Singles)</option>
                    <option value="2">2 players</option>
                    <option value="3">3 players (Doubles)</option>
                    <option value="4">4 players</option>
                    <option value="5">5 players</option>
                    <option value="6">6 players</option>
                    <option value="7">7 players</option>
                    <option value="8">8 players</option>
                  </select>
                  {errors.playersNeeded && <p className="text-red-500 text-sm mt-1">{errors.playersNeeded}</p>}
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPrivate"
                      checked={formData.isPrivate}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Private match (invite only)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Match Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your match, what to expect, any special requirements, etc."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>{isLoading ? 'Creating Match...' : 'Create Match'}</span>
              </button>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;