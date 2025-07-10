import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Calendar, Target, MapPin, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/signup', label: 'Sign Up', icon: Users },
    { path: '/matchmaking', label: 'Matchmaking', icon: Target },
    { path: '/schedule', label: 'Schedule', icon: Calendar },
    { path: '/court-assignment', label: 'Courts', icon: MapPin },
  ];

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">
            PicklePro
          </Link>
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-yellow-400 text-green-800 shadow-md'
                    : 'text-white hover:bg-green-500 hover:shadow-md'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;