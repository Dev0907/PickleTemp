import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Trophy } from 'lucide-react';

const CreateMatch: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    maxPlayers: 4,
    level: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Match title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    if (!formData.level) {
      newErrors.level = 'Skill level is required';
    }

    if (formData.maxPlayers < 2 || formData.maxPlayers > 8) {
      newErrors.maxPlayers = 'Players must be between 2 and 8';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating match:', formData);
      alert('Match created successfully! Players can now join your match.');
      
      // Reset form
      setFormData({
        title: '',
        date: '',
        time: '',
        venue: '',
        maxPlayers: 4,
        level: '',
        description: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-4">Create Match</h1>
          <p className="text-lg text-gray-600">Set up a new pickleball match and invite players</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Match Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-deep-navy mb-2">
                Match Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Weekend Doubles Match"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-deep-navy mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Match Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-deep-navy mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Match Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
              </div>
            </div>

            {/* Venue */}
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-deep-navy mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Venue *
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="e.g., Central Sports Complex, Court 1"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.venue ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.venue && <p className="mt-1 text-sm text-red-600">{errors.venue}</p>}
            </div>

            {/* Max Players and Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="maxPlayers" className="block text-sm font-medium text-deep-navy mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Max Players *
                </label>
                <input
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleInputChange}
                  min="2"
                  max="8"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.maxPlayers ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxPlayers && <p className="mt-1 text-sm text-red-600">{errors.maxPlayers}</p>}
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-deep-navy mb-2">
                  <Trophy className="w-4 h-4 inline mr-1" />
                  Skill Level *
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.level ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
                {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-deep-navy mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Add any additional details about the match..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-ocean-teal text-white py-3 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:ring-offset-2"
              >
                Create Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;