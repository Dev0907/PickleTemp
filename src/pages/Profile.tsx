import React, { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, Building, Camera, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: user?.email || '',
    phoneNumber: '+91 9876543210',
    age: '28',
    gender: 'male',
    level: 'intermediate',
    location: user?.userType === 'owner' ? 'Mumbai, Maharashtra' : '',
    numberOfCourts: user?.userType === 'owner' ? '4' : ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
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

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 13 and 100';
    }

    // Owner-specific validation
    if (user?.userType === 'owner') {
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
      if (!formData.numberOfCourts) {
        newErrors.numberOfCourts = 'Number of courts is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateProfileForm()) {
      console.log('Updating profile:', formData);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      console.log('Updating password');
      setSuccessMessage('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-navy mb-4">Profile & Settings</h1>
          <p className="text-lg text-gray-600">Manage your account information</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-deep-navy mb-4">Profile Picture</h2>
              
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-sky-mist rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-16 h-16 text-ocean-teal" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-lemon-zest text-deep-navy p-2 rounded-full hover:bg-yellow-400 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Click the camera icon to upload a new photo</p>
                <div className="text-sm text-gray-500">
                  <p className="font-medium">{formData.fullName}</p>
                  <p className="capitalize">{user?.userType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-deep-navy mb-6">Personal Information</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Full Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-deep-navy mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name
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
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-deep-navy mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
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
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone and Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-deep-navy mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
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
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-deep-navy mb-2">
                      Age
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
                    />
                    {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                  </div>
                </div>

                {/* Gender and Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-deep-navy mb-2">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-deep-navy mb-2">
                      Skill Level
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Owner-specific fields */}
                {user?.userType === 'owner' && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-deep-navy mb-4">Facility Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-deep-navy mb-2">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Location
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
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                      </div>

                      <div>
                        <label htmlFor="numberOfCourts" className="block text-sm font-medium text-deep-navy mb-2">
                          <Building className="w-4 h-4 inline mr-1" />
                          Number of Courts
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
                        />
                        {errors.numberOfCourts && <p className="mt-1 text-sm text-red-600">{errors.numberOfCourts}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-ocean-teal text-white py-2 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:ring-offset-2 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-deep-navy">Password & Security</h2>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="text-ocean-teal hover:underline font-medium"
                >
                  {showPasswordForm ? 'Cancel' : 'Change Password'}
                </button>
              </div>

              {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-deep-navy mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-deep-navy mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-deep-navy mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-teal ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-lemon-zest text-deep-navy py-2 px-6 rounded-md font-medium hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-lemon-zest focus:ring-offset-2"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}

              {!showPasswordForm && (
                <p className="text-gray-600">
                  Keep your account secure by using a strong password and updating it regularly.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;