import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'day'>('week');

  const matches = [
    { id: 1, time: '09:00', players: 'Sarah Johnson vs Mike Chen', court: 'Court 1', skill: 'intermediate' },
    { id: 2, time: '10:00', players: 'Lisa Rodriguez vs David Kim', court: 'Court 2', skill: 'beginner' },
    { id: 3, time: '11:00', players: 'Emily Davis vs James Brown', court: 'Court 1', skill: 'advanced' },
    { id: 4, time: '14:00', players: 'Anna Martinez vs Tom Wilson', court: 'Court 3', skill: 'intermediate' },
    { id: 5, time: '15:00', players: 'Sarah Johnson vs Lisa Rodriguez', court: 'Court 2', skill: 'mixed' },
    { id: 6, time: '16:00', players: 'Mike Chen vs Emily Davis', court: 'Court 1', skill: 'advanced' },
  ];

  const getWeekDays = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mixed': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Match Schedule</h1>
        <p className="text-gray-600">View and manage upcoming matches</p>
      </div>

      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                view === 'week' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                view === 'day' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Day View
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {view === 'week' ? (
          <div className="grid grid-cols-8 gap-0">
            {/* Time column header */}
            <div className="bg-gray-100 p-4 font-semibold text-gray-700 border-b border-gray-200">
              Time
            </div>
            {/* Day headers */}
            {weekDays.map((day, index) => (
              <div key={index} className="bg-gray-100 p-4 text-center border-b border-gray-200">
                <div className="font-semibold text-gray-700">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-sm text-gray-500">{day.getDate()}</div>
              </div>
            ))}
            
            {/* Time slots */}
            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
              <React.Fragment key={hour}>
                <div className="p-4 border-b border-gray-200 bg-gray-50 text-sm text-gray-600 font-medium">
                  {hour}:00
                </div>
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="p-2 border-b border-gray-200 min-h-[80px] hover:bg-gray-50 transition-colors duration-200">
                    {matches
                      .filter(match => match.time === `${hour.toString().padStart(2, '0')}:00`)
                      .map((match) => (
                        <div
                          key={match.id}
                          className={`p-2 rounded-lg border-2 mb-1 text-xs ${getSkillColor(match.skill)} hover:shadow-md transition-shadow duration-200 cursor-pointer`}
                        >
                          <div className="font-medium">{match.players}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {match.court}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              45m
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {formatDate(currentDate)}
            </h3>
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className={`p-4 rounded-lg border-2 ${getSkillColor(match.skill)} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{match.players}</h4>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {match.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.court}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {match.skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">12</h3>
          <p className="text-gray-600">Matches Today</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">24</h3>
          <p className="text-gray-600">Active Players</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-800">8</h3>
          <p className="text-gray-600">Available Courts</p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;