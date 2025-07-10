import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mint-green">
      <Navbar isLanding={true} />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-mint-green">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-lime-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <h1 className="text-3xl font-bold text-olive-green mb-2">Welcome Back</h1>
              <p className="text-olive-green/70">Sign in to your PickleBall Pro account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-olive-green mb-2">
                  Email Address
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

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-olive-green mb-2">
                  Password
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-lime-green border-mint-green rounded focus:ring-lime-green"
                  />
                  <span className="ml-2 text-sm text-olive-green">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-lime-green hover:text-lime-green/80 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lime-green text-white py-3 rounded-lg font-semibold text-lg hover:bg-lime-green/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center">{errors.submit}</p>
              )}

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-olive-green">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-lime-green hover:text-lime-green/80 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-pale-yellow rounded-lg">
              <p className="text-sm text-olive-green text-center mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-olive-green/70 text-center">
                Email: demo@pickleballpro.com<br />
                Password: demo123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;