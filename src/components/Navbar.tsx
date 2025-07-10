import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PickleballLogo from './PickleballLogo';

interface NavbarProps {
  isLanding?: boolean;
}

const Navbar = ({ isLanding = false }: NavbarProps) => {
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
      // Implement global search functionality
      console.log('Searching for:', searchTerm);
    }
  };

  const landingNavItems = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const dashboardNavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Matches', href: '/join-match' },
    { label: 'Tournaments', href: '/tournaments' },
    { label: 'Settings', href: '/profile' },
  ];

  const navItems = isLanding ? landingNavItems : dashboardNavItems;

  return (
    <nav className="bg-sport-blue shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-3">
              <PickleballLogo size="md" />
              <span className="text-xl font-bold text-white font-poppins">PickleBall Pro</span>
            </Link>
          </div>

          {/* Global Search Bar (only when authenticated) */}
          {isAuthenticated && !isLanding && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sport-gray w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search matches, tournaments, players..."
                    className="w-full pl-10 pr-4 py-2 bg-sport-yellow-light text-sport-gray-dark rounded-lg focus:ring-2 focus:ring-sport-yellow focus:outline-none placeholder-sport-gray-dark/60 font-poppins"
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
                className={`text-white hover:text-sport-yellow px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 font-poppins ${
                  location.pathname === item.href ? 'text-sport-yellow' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isLanding && !isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-sport-yellow px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 font-poppins"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-sport-yellow text-sport-blue px-6 py-2 rounded-lg font-medium hover:bg-sport-yellow-dark transition-all duration-200 shadow-md font-poppins"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                  <span className="text-sm font-medium text-white font-poppins">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-sport-yellow p-2 rounded-md transition-colors duration-200"
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
              className="text-white hover:text-sport-yellow p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-sport-blue border-t border-sport-blue-light">
              {/* Mobile Search */}
              {isAuthenticated && !isLanding && (
                <div className="mb-4">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sport-gray-dark w-5 h-5" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-sport-yellow-light text-sport-gray-dark rounded-lg focus:ring-2 focus:ring-sport-yellow focus:outline-none placeholder-sport-gray-dark/60 font-poppins"
                      />
                    </div>
                  </form>
                </div>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-white hover:text-sport-yellow block px-3 py-2 rounded-md text-base font-medium font-poppins"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isLanding && !isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-sport-yellow block px-3 py-2 rounded-md text-base font-medium font-poppins"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-sport-yellow text-sport-blue block px-3 py-2 rounded-md text-base font-medium mx-3 text-center font-poppins"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <div className="border-t border-sport-blue-light pt-4 mt-4">
                  <div className="flex items-center px-3 py-2">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <User className="w-8 h-8 text-white mr-3" />
                    )}
                    <span className="text-base font-medium text-white font-poppins">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-sport-yellow block px-3 py-2 rounded-md text-base font-medium w-full text-left font-poppins"
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