import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchTerm);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="bg-ocean-teal shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-lemon-zest rounded-full flex items-center justify-center">
                <span className="text-deep-navy font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold text-ivory-whisper">
                Pickle<span className="text-lemon-zest">Pro</span>
              </span>
            </Link>
          </div>

          {/* Global Search Bar (only when authenticated) */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-navy w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search matches, tournaments, players..."
                    className="w-full pl-10 pr-4 py-2 bg-ivory-whisper text-deep-navy rounded-lg focus:ring-2 focus:ring-lemon-zest focus:outline-none placeholder-deep-navy/60"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-ivory-whisper hover:text-lemon-zest px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href ? 'text-lemon-zest' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-ivory-whisper hover:text-lemon-zest px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-accent text-sm"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-ivory-whisper hover:text-lemon-zest"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-ivory-whisper hover:text-lemon-zest p-2 rounded-md transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-ivory-whisper hover:text-lemon-zest p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ocean-teal border-t border-ocean-teal-light">
              {/* Mobile Search */}
              {isAuthenticated && (
                <div className="mb-4">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-navy w-5 h-5" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-ivory-whisper text-deep-navy rounded-lg focus:ring-2 focus:ring-lemon-zest focus:outline-none placeholder-deep-navy/60"
                      />
                    </div>
                  </form>
                </div>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-ivory-whisper hover:text-lemon-zest block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="text-ivory-whisper hover:text-lemon-zest block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-lemon-zest text-deep-navy block px-3 py-2 rounded-md text-base font-medium mx-3 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="border-t border-ocean-teal-light pt-4 mt-4">
                  <div className="flex items-center px-3 py-2">
                    <User className="w-6 h-6 text-ivory-whisper mr-3" />
                    <span className="text-base font-medium text-ivory-whisper">{user?.name}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="text-ivory-whisper hover:text-lemon-zest block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-ivory-whisper hover:text-lemon-zest block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;