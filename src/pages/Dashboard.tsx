import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Trophy, MapPin, Bell, Activity, Plus, TrendingUp, Upload, Video, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
    }
  };

  const stats = [
    { title: 'Matches Played', value: '24', change: '+3 this week', icon: Activity, color: 'bg-lime-green' },
    { title: 'Upcoming Matches', value: '3', change: 'Next: Tomorrow 2PM', icon: Calendar, color: 'bg-gold-yellow' },
    { title: 'Tournament Wins', value: '2', change: '+1 this month', icon: Trophy, color: 'bg-olive-green' },
    { title: 'Skill Rating', value: '3.2', change: '+0.2 improvement', icon: TrendingUp, color: 'bg-mint-green' },
  ];

  const recentMatches = [
    { id: 1, opponent: 'Sarah Johnson', result: 'Won', score: '11-8, 11-6', date: '2 days ago', venue: 'Central Courts' },
    { id: 2, opponent: 'Mike Chen', result: 'Lost', score: '9-11, 11-7, 8-11', date: '5 days ago', venue: 'Sports Complex' },
    { id: 3, opponent: 'Emily Davis', result: 'Won', score: '11-5, 11-9', date: '1 week ago', venue: 'Community Center' },
  ];

  const upcomingMatches = [
    { id: 1, opponent: 'Alex Rodriguez', time: 'Tomorrow 2:00 PM', venue: 'Central Courts', skillLevel: 'Intermediate' },
    { id: 2, opponent: 'Lisa Park', time: 'Friday 6:00 PM', venue: 'Sports Complex', skillLevel: 'Intermediate' },
    { id: 3, opponent: 'Tournament Match', time: 'Saturday 10:00 AM', venue: 'Elite Arena', skillLevel: 'Mixed' },
  ];

  const notifications = [
    { id: 1, message: 'Match confirmed with Alex Rodriguez for tomorrow', time: '2 hours ago', type: 'match' },
    { id: 2, message: 'New tournament registration open: Summer Championship', time: '1 day ago', type: 'tournament' },
    { id: 3, message: 'Your skill rating has been updated to 3.2', time: '3 days ago', type: 'rating' },
  ];

  return (
    <div className="min-h-screen bg-mint-green">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-olive-green rounded-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="text-mint-green">Ready to play some pickleball today?</p>
              </div>
              <div className="hidden md:block">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-mint-green/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-mint-green/20 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Video Section - Centerpiece */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-mint-green">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-olive-green" />
              </div>
              <h2 className="text-2xl font-bold text-olive-green mb-4">Upload Your Match Video</h2>
              <p className="text-olive-green/70 mb-6">
                Upload your match videos to get detailed performance analytics and improve your game
              </p>
              
              {uploadedVideo ? (
                <div className="mb-6">
                  <video
                    src={uploadedVideo}
                    controls
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                  <div className="mt-4 flex justify-center space-x-4">
                    <button className="bg-lime-green text-white px-6 py-2 rounded-lg font-semibold hover:bg-lime-green/90 transition-colors flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Analyze Video</span>
                    </button>
                    <label className="bg-gold-yellow text-olive-green px-6 py-2 rounded-lg font-semibold hover:bg-pale-yellow transition-colors cursor-pointer flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Upload Another</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="inline-flex items-center space-x-3 bg-gold-yellow hover:bg-pale-yellow text-olive-green px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
                  <Upload className="w-6 h-6" />
                  <span>Upload Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-mint-green">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-olive-green">{stat.value}</p>
                  <p className="text-sm text-olive-green/60">{stat.title}</p>
                </div>
              </div>
              <p className="text-sm text-lime-green font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-mint-green">
          <h2 className="text-xl font-semibold text-olive-green mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/join-match"
              className="flex items-center justify-center p-6 bg-lime-green text-white rounded-lg hover:bg-lime-green/90 transition-all duration-200 transform hover:scale-105"
            >
              <Users className="w-6 h-6 mr-3" />
              <span className="font-semibold">Join a Match</span>
            </Link>
            <Link
              to="/create-match"
              className="flex items-center justify-center p-6 bg-gold-yellow text-olive-green rounded-lg hover:bg-pale-yellow transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-6 h-6 mr-3" />
              <span className="font-semibold">Create Match</span>
            </Link>
            <Link
              to="/tournaments"
              className="flex items-center justify-center p-6 bg-olive-green text-white rounded-lg hover:bg-olive-green/90 transition-all duration-200 transform hover:scale-105"
            >
              <Trophy className="w-6 h-6 mr-3" />
              <span className="font-semibold">View Tournaments</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Matches */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-mint-green">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-olive-green flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-lime-green" />
                Upcoming Matches
              </h2>
              <Link to="/join-match" className="text-lime-green hover:text-lime-green/80 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="p-4 bg-mint-green/20 rounded-lg hover:bg-mint-green/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-olive-green">{match.opponent}</h3>
                    <span className="text-sm bg-lime-green text-white px-2 py-1 rounded-full">
                      {match.skillLevel}
                    </span>
                  </div>
                  <div className="text-sm text-olive-green/70 space-y-1">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {match.time}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {match.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-mint-green">
            <h2 className="text-xl font-semibold text-olive-green mb-6 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-gold-yellow" />
              Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-pale-yellow rounded-lg">
                  <p className="text-sm text-olive-green mb-1">{notification.message}</p>
                  <p className="text-xs text-olive-green/60">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-mint-green">
          <h2 className="text-xl font-semibold text-olive-green mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-lime-green" />
            Recent Match History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-mint-green">
                  <th className="text-left py-3 px-4 font-semibold text-olive-green">Opponent</th>
                  <th className="text-left py-3 px-4 font-semibold text-olive-green">Result</th>
                  <th className="text-left py-3 px-4 font-semibold text-olive-green">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-olive-green">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-olive-green">Venue</th>
                </tr>
              </thead>
              <tbody>
                {recentMatches.map((match) => (
                  <tr key={match.id} className="border-b border-mint-green/30 hover:bg-mint-green/10">
                    <td className="py-3 px-4 font-medium text-olive-green">{match.opponent}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        match.result === 'Won' 
                          ? 'bg-lime-green text-white' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {match.result}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-olive-green/70">{match.score}</td>
                    <td className="py-3 px-4 text-olive-green/70">{match.date}</td>
                    <td className="py-3 px-4 text-olive-green/70">{match.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;