import React, { useState } from 'react';
import { Trophy, Calendar, Clock, MapPin, Users, DollarSign, FileText } from 'lucide-react';

const CreateTournament: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    entryFee: '',
    maxTeams: '',
    organizerContact: '',
    level: '',
    format: ''
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

    if (!formData.name.trim()) {
      newErrors.name = 'Tournament name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.entryFee) {
      newErrors.entryFee = 'Entry fee is required';
    } else if (isNaN(Number(formData.entryFee)) || Number(formData.entryFee) < 0) {
      newErrors.entryFee = 'Entry fee must be a valid number';
    }

    if (!formData.maxTeams) {
      newErrors.maxTeams = 'Maximum teams is required';
    } else if (isNaN(Number(formData.maxTeams)) || Number(formData.maxTeams) < 2) {
      newErrors.maxTeams = 'Must have at least 2 teams';
    }

    if (!formData.organizerContact.trim()) {
      newErrors.organizerContact = 'Organizer contact is required';
    }

    if (!formData.level) {
      newErrors.level = 'Skill level is required';
    }

    if (!formData.format) {
      newErrors.format = 'Tournament format is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating tournament:', formData);
      alert('Tournament created successfully! Players can now register for your tournament.');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        entryFee: '',
        maxTeams: '',
        organizerContact: '',
        level: '',
        format: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-4">Create Tournament</h1>
          <p className="text-lg text-gray-600">Organize an exciting pickleball tournament</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tournament Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-deep-navy mb-2">
                <Trophy className="w-4 h-4 inline mr-1" />
                Tournament Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Summer Championship 2025"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-deep-navy mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your tournament, rules, and any special information..."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-deep-navy mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Tournament Date *
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
                  Start Time *
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

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-deep-navy mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Central Sports Complex, Mumbai"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            {/* Entry Fee and Max Teams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="entryFee" className="block text-sm font-medium text-deep-navy mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Entry Fee (₹) *
                </label>
                <input
                  type="number"
                  id="entryFee"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.entryFee ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.entryFee && <p className="mt-1 text-sm text-red-600">{errors.entryFee}</p>}
              </div>

              <div>
                <label htmlFor="maxTeams" className="block text-sm font-medium text-deep-navy mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Maximum Teams *
                </label>
                <input
                  type="number"
                  id="maxTeams"
                  name="maxTeams"
                  value={formData.maxTeams}
                  onChange={handleInputChange}
                  min="2"
                  placeholder="16"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.maxTeams ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxTeams && <p className="mt-1 text-sm text-red-600">{errors.maxTeams}</p>}
              </div>
            </div>

            {/* Skill Level and Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-deep-navy mb-2">
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
                  <option value="Open">Open (All Levels)</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
                {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
              </div>

              <div>
                <label htmlFor="format" className="block text-sm font-medium text-deep-navy mb-2">
                  Tournament Format *
                </label>
                <select
                  id="format"
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.format ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Format</option>
                  <option value="Single Elimination">Single Elimination</option>
                  <option value="Double Elimination">Double Elimination</option>
                  <option value="Round Robin">Round Robin</option>
                  <option value="Swiss System">Swiss System</option>
                </select>
                {errors.format && <p className="mt-1 text-sm text-red-600">{errors.format}</p>}
              </div>
            </div>

            {/* Organizer Contact */}
            <div>
              <label htmlFor="organizerContact" className="block text-sm font-medium text-deep-navy mb-2">
                Organizer Contact *
              </label>
              <input
                type="text"
                id="organizerContact"
                name="organizerContact"
                value={formData.organizerContact}
                onChange={handleInputChange}
                placeholder="Email or phone number"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.organizerContact ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.organizerContact && <p className="mt-1 text-sm text-red-600">{errors.organizerContact}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-ocean-teal text-white py-3 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:ring-offset-2"
              >
                Create Tournament
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;