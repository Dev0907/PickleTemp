import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    gender: '',
    level: '',
    userType: 'player',
    phoneNumber: '',
    location: '',
    numberOfCourts: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 13 and 100';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.level) {
      newErrors.level = 'Skill level is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    // Owner-specific validation
    if (formData.userType === 'owner') {
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required for owners';
      }
      if (!formData.numberOfCourts) {
        newErrors.numberOfCourts = 'Number of courts is required for owners';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate successful registration
      console.log('Registration data:', formData);
      
      // Log the user in and redirect to appropriate dashboard
      login(formData.email, formData.userType as 'player' | 'owner');
      
      if (formData.userType === 'player') {
        navigate('/player-dashboard');
      } else {
        navigate('/owner-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-4">Join PicklePro</h1>
          <p className="text-lg text-gray-600">Create your account and start playing</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-deep-navy mb-3">
                I am a *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="userType"
                    value="player"
                    checked={formData.userType === 'player'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <User className="w-5 h-5 mr-2 text-ocean-teal" />
                  Player
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="userType"
                    value="owner"
                    checked={formData.userType === 'owner'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <Building className="w-5 h-5 mr-2 text-ocean-teal" />
                  Court Owner
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-deep-navy mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-deep-navy mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-deep-navy mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="13"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="25"
                />
                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-deep-navy mb-2">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Minimum 6 characters"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-deep-navy mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Gender and Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-deep-navy mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>

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
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-deep-navy mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+91 9876543210"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            {/* Owner-specific fields */}
            {formData.userType === 'owner' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-deep-navy mb-4">Court Owner Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="City, State"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>

                  <div>
                    <label htmlFor="numberOfCourts" className="block text-sm font-medium text-deep-navy mb-2">
                      Number of Courts *
                    </label>
                    <input
                      type="number"
                      id="numberOfCourts"
                      name="numberOfCourts"
                      value={formData.numberOfCourts}
                      onChange={handleInputChange}
                      min="1"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                        errors.numberOfCourts ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="4"
                    />
                    {errors.numberOfCourts && <p className="mt-1 text-sm text-red-600">{errors.numberOfCourts}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-lemon-zest text-deep-navy py-3 px-4 rounded-md font-medium hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lemon-zest focus:ring-offset-2"
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-ocean-teal hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;