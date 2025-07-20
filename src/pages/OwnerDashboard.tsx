import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Calendar, Trophy, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Tournaments', value: '3', change: '+1 this month', icon: Trophy, color: 'bg-ocean-teal' },
    { title: 'Total Players', value: '127', change: '+15 this week', icon: Users, color: 'bg-sky-mist' },
    { title: 'Courts Available', value: '8', change: 'All operational', icon: Calendar, color: 'bg-lemon-zest' },
    { title: 'Revenue', value: '₹45,600', change: '+12% this month', icon: BarChart3, color: 'bg-ocean-teal' },
  ];

  const recentTournaments = [
    { id: 1, name: 'Summer Championship', players: 32, status: 'Active', date: 'July 15-17' },
    { id: 2, name: 'Beginner\'s Cup', players: 16, status: 'Registration Open', date: 'July 22-23' },
    { id: 3, name: 'Pro League', players: 24, status: 'Completed', date: 'July 8-10' },
  ];

  return (
    <div className="min-h-screen bg-ivory-whisper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-ocean-teal rounded-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="text-sky-mist">Manage your tournaments and facilities</p>
              </div>
              <div className="hidden md:block">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-sky-mist/20"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-sky-mist/20 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Tournament Section - Centerpiece */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-sky-mist">
            <div className="text-center">
              <div className="w-16 h-16 bg-lemon-zest rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-deep-navy" />
              </div>
              <h2 className="text-2xl font-bold text-deep-navy mb-4">Create New Tournament</h2>
              <p className="text-deep-navy/70 mb-6">
                Organize exciting tournaments and bring the pickleball community together
              </p>
              
              <Link
                to="/create-tournament"
                className="inline-flex items-center space-x-3 bg-lemon-zest hover:bg-lemon-zest/90 text-deep-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-6 h-6" />
                <span>Create Tournament</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-sky-mist">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-deep-navy">{stat.value}</p>
                  <p className="text-sm text-deep-navy/60">{stat.title}</p>
                </div>
              </div>
              <p className="text-sm text-ocean-teal font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-sky-mist">
          <h2 className="text-xl font-semibold text-deep-navy mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/create-tournament"
              className="flex items-center justify-center p-6 bg-ocean-teal text-white rounded-lg hover:bg-ocean-teal/90 transition-all duration-200 transform hover:scale-105"
            >
              <Trophy className="w-6 h-6 mr-3" />
              <span className="font-semibold">Create Tournament</span>
            </Link>
            <button className="flex items-center justify-center p-6 bg-sky-mist text-deep-navy rounded-lg hover:bg-sky-mist/90 transition-all duration-200 transform hover:scale-105">
              <Users className="w-6 h-6 mr-3" />
              <span className="font-semibold">Manage Players</span>
            </button>
            <button className="flex items-center justify-center p-6 bg-lemon-zest text-deep-navy rounded-lg hover:bg-lemon-zest/90 transition-all duration-200 transform hover:scale-105">
              <Settings className="w-6 h-6 mr-3" />
              <span className="font-semibold">Facility Settings</span>
            </button>
          </div>
        </div>

        {/* Recent Tournaments */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-sky-mist">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-deep-navy flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-ocean-teal" />
              Recent Tournaments
            </h2>
            <Link to="/tournaments" className="text-ocean-teal hover:text-ocean-teal/80 font-medium">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sky-mist">
                  <th className="text-left py-3 px-4 font-semibold text-deep-navy">Tournament</th>
                  <th className="text-left py-3 px-4 font-semibold text-deep-navy">Players</th>
                  <th className="text-left py-3 px-4 font-semibold text-deep-navy">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-deep-navy">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTournaments.map((tournament) => (
                  <tr key={tournament.id} className="border-b border-sky-mist/30 hover:bg-sky-mist/10">
                    <td className="py-3 px-4 font-medium text-deep-navy">{tournament.name}</td>
                    <td className="py-3 px-4 text-deep-navy/70">{tournament.players}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tournament.status === 'Active' 
                          ? 'bg-ocean-teal text-white' 
                          : tournament.status === 'Registration Open'
                          ? 'bg-lemon-zest text-deep-navy'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tournament.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-deep-navy/70">{tournament.date}</td>
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

export default OwnerDashboard;