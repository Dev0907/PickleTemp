export interface Venue {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  originalPrice?: number;
  facilities: string[];
  operatingHours: string;
  isHudleExclusive: boolean;
  discount?: number;
  description: string;
  courts: number;
  amenities: string[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueFilters {
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  facilities: string[];
  searchTerm: string;
}

export interface VenueReview {
  id: string;
  venueId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface VenueBooking {
  id: string;
  venueId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  courtNumber: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}