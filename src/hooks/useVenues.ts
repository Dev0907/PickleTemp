import { useState, useEffect } from 'react';
import { Venue, VenueFilters } from '../types/venue';
import { venueService } from '../services/venueService';

export const useVenues = (filters: VenueFilters, sortBy: 'rating' | 'price' | 'distance') => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await venueService.getVenues(filters, sortBy);
        setVenues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [filters, sortBy]);

  const updateVenueRating = async (venueId: string, rating: number) => {
    try {
      await venueService.updateRating(venueId, rating);
      // Get the updated rating first
      const updatedRating = await venueService.getAverageRating(venueId);
      // Update local state
      setVenues(prev => prev.map(venue => 
        venue.id === venueId 
          ? { ...venue, rating: updatedRating }
          : venue
      ));
    } catch (err) {
      throw new Error('Failed to update rating');
    }
  };

  const shareVenue = async (venueId: string) => {
    try {
      await venueService.incrementShareCount(venueId);
    } catch (err) {
      console.error('Failed to track share:', err);
    }
  };

  return {
    venues,
    loading,
    error,
    updateVenueRating,
    shareVenue
  };
};