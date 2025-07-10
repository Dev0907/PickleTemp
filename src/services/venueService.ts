import { Venue, VenueFilters, VenueReview } from '../types/venue';

// Simulated database service - replace with actual database calls
class VenueService {
  private venues: Venue[] = [
    {
      id: '1',
      name: 'Elite Sports Arena Vadodara',
      location: 'Alkapuri',
      image: 'https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      reviewCount: 156,
      startingPrice: 800,
      originalPrice: 1000,
      facilities: ['parking', 'wifi', 'cafe', 'changing_rooms', 'equipment_rental'],
      operatingHours: '6:00 AM - 11:00 PM',
      isHudleExclusive: true,
      discount: 20,
      description: 'Premium pickleball facility with 6 courts and professional coaching',
      courts: 6,
      amenities: ['Air Conditioning', 'Professional Lighting', 'Sound System'],
      contactInfo: {
        phone: '+91 9876543210',
        email: 'info@elitesportsarena.com',
        website: 'www.elitesportsarena.com'
      },
      coordinates: { lat: 22.3072, lng: 73.1812 },
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      name: 'Sayaji Sports Complex',
      location: 'Sayajigunj',
      image: 'https://images.pexels.com/photos/6224456/pexels-photo-6224456.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      reviewCount: 89,
      startingPrice: 600,
      facilities: ['parking', 'changing_rooms', 'equipment_rental'],
      operatingHours: '5:30 AM - 10:30 PM',
      isHudleExclusive: false,
      discount: 15,
      description: 'Community sports complex with 4 well-maintained pickleball courts',
      courts: 4,
      amenities: ['Outdoor Courts', 'Equipment Storage', 'Seating Area'],
      contactInfo: {
        phone: '+91 9876543211',
        email: 'contact@sayajisports.com'
      },
      coordinates: { lat: 22.3039, lng: 73.1812 },
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date('2024-01-08')
    },
    {
      id: '3',
      name: 'Fatehgunj Recreation Center',
      location: 'Fatehgunj',
      image: 'https://images.pexels.com/photos/6224458/pexels-photo-6224458.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.2,
      reviewCount: 67,
      startingPrice: 500,
      facilities: ['parking', 'wifi', 'cafe'],
      operatingHours: '6:00 AM - 10:00 PM',
      isHudleExclusive: true,
      description: 'Modern recreation center with 3 indoor pickleball courts',
      courts: 3,
      amenities: ['Indoor Courts', 'Climate Control', 'Refreshment Area'],
      contactInfo: {
        phone: '+91 9876543212',
        email: 'info@fatehgunjrec.com'
      },
      coordinates: { lat: 22.3178, lng: 73.1896 },
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '4',
      name: 'Manjalpur Sports Hub',
      location: 'Manjalpur',
      image: 'https://images.pexels.com/photos/6224460/pexels-photo-6224460.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      reviewCount: 124,
      startingPrice: 700,
      originalPrice: 850,
      facilities: ['parking', 'changing_rooms', 'equipment_rental', 'coaching'],
      operatingHours: '5:00 AM - 11:00 PM',
      isHudleExclusive: false,
      discount: 18,
      description: 'Professional sports hub with 5 courts and certified coaches',
      courts: 5,
      amenities: ['Professional Coaching', 'Tournament Facilities', 'Pro Shop'],
      contactInfo: {
        phone: '+91 9876543213',
        email: 'hello@manjalpursports.com',
        website: 'www.manjalpursports.com'
      },
      coordinates: { lat: 22.2587, lng: 73.1614 },
      createdAt: new Date('2023-02-28'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '5',
      name: 'Gotri Tennis & Pickleball Club',
      location: 'Gotri',
      image: 'https://images.pexels.com/photos/6224461/pexels-photo-6224461.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.4,
      reviewCount: 98,
      startingPrice: 650,
      facilities: ['parking', 'wifi', 'cafe', 'changing_rooms'],
      operatingHours: '6:00 AM - 10:30 PM',
      isHudleExclusive: true,
      discount: 12,
      description: 'Exclusive club with 4 premium courts and member facilities',
      courts: 4,
      amenities: ['Club Membership', 'Restaurant', 'Swimming Pool Access'],
      contactInfo: {
        phone: '+91 9876543214',
        email: 'club@gotritennis.com',
        website: 'www.gotritennis.com'
      },
      coordinates: { lat: 22.2442, lng: 73.1538 },
      createdAt: new Date('2023-04-15'),
      updatedAt: new Date('2024-01-09')
    },
    {
      id: '6',
      name: 'Waghodia Road Sports Arena',
      location: 'Waghodia Road',
      image: 'https://images.pexels.com/photos/6224462/pexels-photo-6224462.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.1,
      reviewCount: 45,
      startingPrice: 550,
      facilities: ['parking', 'equipment_rental'],
      operatingHours: '6:30 AM - 9:30 PM',
      isHudleExclusive: false,
      description: 'Affordable sports arena with 3 outdoor courts',
      courts: 3,
      amenities: ['Outdoor Courts', 'Equipment Rental', 'Basic Facilities'],
      contactInfo: {
        phone: '+91 9876543215',
        email: 'info@waghodiasports.com'
      },
      coordinates: { lat: 22.2734, lng: 73.1089 },
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2024-01-03')
    }
  ];

  private reviews: VenueReview[] = [];

  async getVenues(filters: VenueFilters, sortBy: 'rating' | 'price' | 'distance'): Promise<Venue[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredVenues = [...this.venues];

    // Apply filters
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filteredVenues = filteredVenues.filter(venue =>
        venue.name.toLowerCase().includes(searchLower) ||
        venue.location.toLowerCase().includes(searchLower) ||
        venue.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location) {
      filteredVenues = filteredVenues.filter(venue =>
        venue.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange.min > 0 || filters.priceRange.max < 5000) {
      filteredVenues = filteredVenues.filter(venue =>
        venue.startingPrice >= filters.priceRange.min &&
        venue.startingPrice <= filters.priceRange.max
      );
    }

    if (filters.rating > 0) {
      filteredVenues = filteredVenues.filter(venue => venue.rating >= filters.rating);
    }

    if (filters.facilities.length > 0) {
      filteredVenues = filteredVenues.filter(venue =>
        filters.facilities.every(facility => venue.facilities.includes(facility))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filteredVenues.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filteredVenues.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'distance':
        // For demo purposes, sort by location name
        filteredVenues.sort((a, b) => a.location.localeCompare(b.location));
        break;
    }

    return filteredVenues;
  }

  async updateRating(venueId: string, rating: number): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    const review: VenueReview = {
      id: Date.now().toString(),
      venueId,
      userId: 'current-user',
      userName: 'Current User',
      rating,
      comment: '',
      createdAt: new Date()
    };

    this.reviews.push(review);

    // Update venue rating
    const venue = this.venues.find(v => v.id === venueId);
    if (venue) {
      const venueReviews = this.reviews.filter(r => r.venueId === venueId);
      const avgRating = venueReviews.reduce((sum, r) => sum + r.rating, 0) / venueReviews.length;
      venue.rating = Math.round(avgRating * 10) / 10;
      venue.reviewCount = venueReviews.length;
      venue.updatedAt = new Date();
    }
  }

  async getAverageRating(venueId: string): Promise<number> {
    const venue = this.venues.find(v => v.id === venueId);
    return venue?.rating || 0;
  }

  async incrementShareCount(venueId: string): Promise<void> {
    // Simulate API call to track shares
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`Share tracked for venue ${venueId}`);
  }

  async addVenue(venue: Omit<Venue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Venue> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newVenue: Venue = {
      ...venue,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.venues.push(newVenue);
    return newVenue;
  }

  async getVenueById(id: string): Promise<Venue | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.venues.find(venue => venue.id === id) || null;
  }
}

export const venueService = new VenueService();