import React, { useState } from 'react';
import { User, Mail, Lock, Save, Camera, MapPin, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    location: '',
    numberOfCourts: '',
    profilePicture: user?.profilePicture || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (formData.newPassword) {
      if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required to change password';
      if (formData.newPassword.length < 6) newErrors.newPassword = 'New password must be at least 6 characters';
      if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mint-green">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-mint-green">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-olive-green mb-2">Profile Settings</h1>
            <p className="text-olive-green/70">Manage your account information and preferences</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-lime-green/20 border border-lime-green rounded-lg">
              <p className="text-lime-green font-medium text-center">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-mint-green"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-pale-yellow flex items-center justify-center border-4 border-mint-green">
                    <User className="w-12 h-12 text-olive-green" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-lime-green text-white p-3 rounded-full cursor-pointer hover:bg-lime-green/90 transition-colors">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-olive-green/60 mt-2">Click the camera icon to change your profile picture</p>
            </div>

            {/* Personal Information */}
            <div className="bg-pale-yellow/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-olive-green mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.name ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.email ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="bg-pale-yellow/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-olive-green mb-6">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.currentPassword ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="Current password"
                    />
                  </div>
                  {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.newPassword ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="New password"
                    />
                  </div>
                  {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.confirmPassword ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="Confirm new password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Owner-specific fields (if user is an owner) */}
            {user?.role === 'owner' && (
              <div className="bg-pale-yellow/30 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-olive-green mb-6">Facility Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-pale-yellow border border-mint-green rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green"
                        placeholder="Enter facility location"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Number of Courts
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <input
                        type="number"
                        name="numberOfCourts"
                        value={formData.numberOfCourts}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full pl-10 pr-4 py-3 bg-pale-yellow border border-mint-green rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green"
                        placeholder="Number of courts"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-lime-green text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-lime-green/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{isLoading ? 'Saving Changes...' : 'Save Changes'}</span>
              </button>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;