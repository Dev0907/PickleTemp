import React, { useState, useEffect } from 'react';
import { MapPin, Star, Share2, Filter, Search, Loader, Heart, Clock, Users, Wifi, Car, Coffee } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useVenues } from '../hooks/useVenues';
import { Venue, VenueFilters } from '../types/venue';

const VenueListings = () => {
  const [filters, setFilters] = useState<VenueFilters>({
    location: '',
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    facilities: [],
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const { venues, loading, error, updateVenueRating, shareVenue } = useVenues(filters, sortBy);

  const facilityIcons = {
    parking: Car,
    wifi: Wifi,
    cafe: Coffee,
    changing_rooms: Users,
    equipment_rental: Users,
    coaching: Users
  };

  const handleFilterChange = (key: keyof VenueFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFacilityToggle = (facility: string) => {
    setFilters(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleShare = async (venue: Venue) => {
    try {
      await shareVenue(venue.id);
      if (navigator.share) {
        await navigator.share({
          title: venue.name,
          text: `Check out ${venue.name} in ${venue.location} - Starting from ₹${venue.startingPrice}/hour`,
          url: window.location.href + `?venue=${venue.id}`
        });
      } else {
        await navigator.clipboard.writeText(
          `${venue.name} - ${venue.location}\nStarting from ₹${venue.startingPrice}/hour\n${window.location.href}?venue=${venue.id}`
        );
        alert('Venue details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing venue:', error);
    }
  };

  const handleRating = async (venueId: string, rating: number) => {
    try {
      await updateVenueRating(venueId, rating);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const toggleFavorite = (venueId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(venueId)) {
        newFavorites.delete(venueId);
      } else {
        newFavorites.add(venueId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating: number, interactive: boolean = false, venueId?: string) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && venueId ? () => handleRating(venueId, star) : undefined}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">Error loading venues</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pickleball Venues in <span className="text-green-600">Vadodara</span>
          </h1>
          <p className="text-gray-600 text-lg">Discover the best pickleball courts in Gujarat's cultural capital</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search venues..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="distance">Sort by Distance</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area in Vadodara</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">All Areas</option>
                    <option value="Alkapuri">Alkapuri</option>
                    <option value="Fatehgunj">Fatehgunj</option>
                    <option value="Sayajigunj">Sayajigunj</option>
                    <option value="Manjalpur">Manjalpur</option>
                    <option value="Gotri">Gotri</option>
                    <option value="Waghodia Road">Waghodia Road</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹/hour)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </select>
                </div>

                {/* Facilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
                  <div className="space-y-2">
                    {['parking', 'wifi', 'cafe', 'changing_rooms'].map((facility) => (
                      <label key={facility} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.facilities.includes(facility)}
                          onChange={() => handleFacilityToggle(facility)}
                          className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {facility.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin text-yellow-400" />
            <span className="ml-2 text-gray-600">Loading venues...</span>
          </div>
        )}

        {/* Venue Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {/* Venue Image */}
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  
                  {/* Special Tags */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {venue.isHudleExclusive && (
                      <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                        Hudle Exclusive
                      </span>
                    )}
                    {venue.discount && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {venue.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(venue.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(venue.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Venue Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{venue.name}</h3>
                    <button
                      onClick={() => handleShare(venue)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{venue.location}, Vadodara</span>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    {renderStars(venue.rating, true, venue.id)}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{venue.startingPrice}</span>
                      <span className="text-gray-600 text-sm">/hour</span>
                    </div>
                    {venue.originalPrice && venue.originalPrice > venue.startingPrice && (
                      <span className="text-gray-400 line-through text-sm">₹{venue.originalPrice}</span>
                    )}
                  </div>

                  {/* Facilities */}
                  <div className="flex items-center space-x-3 mb-4">
                    {venue.facilities.slice(0, 4).map((facility) => {
                      const IconComponent = facilityIcons[facility as keyof typeof facilityIcons];
                      return IconComponent ? (
                        <div key={facility} className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                        </div>
                      ) : null;
                    })}
                    {venue.facilities.length > 4 && (
                      <span className="text-xs text-gray-500">+{venue.facilities.length - 4} more</span>
                    )}
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{venue.operatingHours}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                      Book Now
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && venues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">No venues found</div>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueListings;