import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Calendar, Users, Star, Upload, Eye, EyeOff, MapPin, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'player',
    age: '',
    gender: '',
    skillLevel: '',
    profilePicture: '',
    location: '',
    numberOfCourts: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error when user starts typing
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

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.role === 'player') {
      if (!formData.age) newErrors.age = 'Age is required';
      else if (parseInt(formData.age) < 13) newErrors.age = 'Must be at least 13 years old';
      
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.skillLevel) newErrors.skillLevel = 'Skill level is required';
    }

    if (formData.role === 'owner') {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.numberOfCourts) newErrors.numberOfCourts = 'Number of courts is required';
      else if (parseInt(formData.numberOfCourts) < 1) newErrors.numberOfCourts = 'Must have at least 1 court';
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await signup(formData);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mint-green">
      <Navbar isLanding={true} />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-mint-green">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-olive-green mb-2">Join PickleBall Pro</h1>
              <p className="text-olive-green/70">Create your account and start playing today!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-mint-green"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-pale-yellow flex items-center justify-center border-4 border-mint-green">
                      <User className="w-8 h-8 text-olive-green" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-lime-green text-white p-2 rounded-full cursor-pointer hover:bg-lime-green/90 transition-colors">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-olive-green/60 mt-2">Upload profile picture (optional)</p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-olive-green mb-2">
                  I am a *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-pale-yellow border border-mint-green rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green"
                >
                  <option value="player">Player</option>
                  <option value="owner">Court Owner</option>
                </select>
              </div>

              {/* Basic Information */}
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

                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.password ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 hover:text-olive-green"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive-green mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                        errors.confirmPassword ? 'border-red-500' : 'border-mint-green'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 hover:text-olive-green"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Player-specific fields */}
              {formData.role === 'player' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Age *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="13"
                        max="100"
                        className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                          errors.age ? 'border-red-500' : 'border-mint-green'
                        }`}
                        placeholder="Enter your age"
                      />
                    </div>
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Gender *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all appearance-none text-olive-green ${
                          errors.gender ? 'border-red-500' : 'border-mint-green'
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Skill Level *
                    </label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <select
                        name="skillLevel"
                        value={formData.skillLevel}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all appearance-none text-olive-green ${
                          errors.skillLevel ? 'border-red-500' : 'border-mint-green'
                        }`}
                      >
                        <option value="">Select your skill level</option>
                        <option value="beginner">Beginner (1.0 - 2.5)</option>
                        <option value="intermediate">Intermediate (3.0 - 3.5)</option>
                        <option value="advanced">Advanced (4.0 - 5.0+)</option>
                      </select>
                    </div>
                    {errors.skillLevel && <p className="text-red-500 text-sm mt-1">{errors.skillLevel}</p>}
                  </div>
                </div>
              )}

              {/* Owner-specific fields */}
              {formData.role === 'owner' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                          errors.location ? 'border-red-500' : 'border-mint-green'
                        }`}
                        placeholder="Enter your facility location"
                      />
                    </div>
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-olive-green mb-2">
                      Number of Courts *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-olive-green/60 w-5 h-5" />
                      <input
                        type="number"
                        name="numberOfCourts"
                        value={formData.numberOfCourts}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full pl-10 pr-4 py-3 bg-pale-yellow border rounded-lg focus:ring-2 focus:ring-lime-green focus:border-transparent transition-all text-olive-green ${
                          errors.numberOfCourts ? 'border-red-500' : 'border-mint-green'
                        }`}
                        placeholder="Number of courts"
                      />
                    </div>
                    {errors.numberOfCourts && <p className="text-red-500 text-sm mt-1">{errors.numberOfCourts}</p>}
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`mt-1 w-4 h-4 text-lime-green border-mint-green rounded focus:ring-lime-green ${
                    errors.agreeToTerms ? 'border-red-500' : ''
                  }`}
                />
                <label className="text-sm text-olive-green">
                  I agree to the{' '}
                  <a href="#" className="text-lime-green hover:text-lime-green/80 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-lime-green hover:text-lime-green/80 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lime-green text-white py-3 rounded-lg font-semibold text-lg hover:bg-lime-green/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center">{errors.submit}</p>
              )}

              {/* Login Link */}
              <div className="text-center">
                <p className="text-olive-green">
                  Already have an account?{' '}
                  <Link to="/login" className="text-lime-green hover:text-lime-green/80 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;