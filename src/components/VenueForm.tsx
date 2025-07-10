import React, { useState } from 'react';
import { Upload, MapPin, Clock, DollarSign, Star, Wifi, Car, Coffee, Users } from 'lucide-react';
import { venueService } from '../services/venueService';
import { Venue } from '../types/venue';

interface VenueFormProps {
  onSubmit: (venue: Venue) => void;
  onCancel: () => void;
}

const VenueForm: React.FC<VenueFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    startingPrice: 0,
    originalPrice: 0,
    facilities: [] as string[],
    operatingHours: '',
    isHudleExclusive: false,
    discount: 0,
    description: '',
    courts: 1,
    amenities: [] as string[],
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    },
    coordinates: {
      lat: 22.3072,
      lng: 73.1812
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const facilityOptions = [
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'cafe', label: 'Cafe', icon: Coffee },
    { id: 'changing_rooms', label: 'Changing Rooms', icon: Users },
    { id: 'equipment_rental', label: 'Equipment Rental', icon: Users },
    { id: 'coaching', label: 'Coaching', icon: Users }
  ];

  const locationOptions = [
    'Alkapuri', 'Fatehgunj', 'Sayajigunj', 'Manjalpur', 'Gotri', 'Waghodia Road'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: type === 'number' ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFacilityToggle = (facilityId: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facilityId)
        ? prev.facilities.filter(f => f !== facilityId)
        : [...prev.facilities, facilityId]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Venue name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.image) newErrors.image = 'Venue image is required';
    if (formData.startingPrice <= 0) newErrors.startingPrice = 'Starting price must be greater than 0';
    if (!formData.operatingHours.trim()) newErrors.operatingHours = 'Operating hours are required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.courts < 1) newErrors.courts = 'Must have at least 1 court';
    if (!formData.contactInfo.phone.trim()) newErrors['contactInfo.phone'] = 'Phone number is required';
    if (!formData.contactInfo.email.trim()) newErrors['contactInfo.email'] = 'Email is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const newVenue = await venueService.addVenue({
        ...formData,
        rating: 0,
        reviewCount: 0
      });
      onSubmit(newVenue);
    } catch (error) {
      setErrors({ submit: 'Failed to add venue. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Venue</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter venue name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location in Vadodara *
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select location</option>
              {locationOptions.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue Image *
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Price (₹/hour) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                name="startingPrice"
                value={formData.startingPrice}
                onChange={handleInputChange}
                min="0"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                  errors.startingPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="500"
              />
            </div>
            {errors.startingPrice && <p className="text-red-500 text-sm mt-1">{errors.startingPrice}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (₹/hour)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="15"
            />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facilities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {facilityOptions.map(facility => (
              <label key={facility.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(facility.id)}
                  onChange={() => handleFacilityToggle(facility.id)}
                  className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <facility.icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">{facility.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Operating Hours and Courts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating Hours *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="operatingHours"
                value={formData.operatingHours}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                  errors.operatingHours ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6:00 AM - 10:00 PM"
              />
            </div>
            {errors.operatingHours && <p className="text-red-500 text-sm mt-1">{errors.operatingHours}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Courts *
            </label>
            <input
              type="number"
              name="courts"
              value={formData.courts}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors.courts ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="4"
            />
            {errors.courts && <p className="text-red-500 text-sm mt-1">{errors.courts}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your venue, facilities, and what makes it special..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors['contactInfo.phone'] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+91 9876543210"
            />
            {errors['contactInfo.phone'] && <p className="text-red-500 text-sm mt-1">{errors['contactInfo.phone']}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                errors['contactInfo.email'] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="info@venue.com"
            />
            {errors['contactInfo.email'] && <p className="text-red-500 text-sm mt-1">{errors['contactInfo.email']}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              name="contactInfo.website"
              value={formData.contactInfo.website}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="www.venue.com"
            />
          </div>
        </div>

        {/* Hudle Exclusive */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isHudleExclusive"
            checked={formData.isHudleExclusive}
            onChange={handleInputChange}
            className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
          />
          <label className="text-sm text-gray-700">
            Mark as Hudle Exclusive venue
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Venue...' : 'Add Venue'}
          </button>
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}
      </form>
    </div>
  );
};

export default VenueForm;