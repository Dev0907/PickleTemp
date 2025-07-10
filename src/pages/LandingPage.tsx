import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Trophy, Target, ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import PickleballLogo from '../components/PickleballLogo';

const LandingPage = () => {
  const features = [
    {
      icon: Play,
      title: 'Smart Match Creation',
      description: 'Easily organize matches with intelligent player matching based on skill level and availability'
    },
    {
      icon: Trophy,
      title: 'Tournament Management',
      description: 'Create and manage tournaments with automated brackets and real-time scoring'
    },
    {
      icon: Target,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed statistics and video analysis tools'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with players worldwide and build lasting friendships through sport'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Tournament Player',
      content: 'This platform has revolutionized how I find and organize pickleball matches. The community is amazing!',
      rating: 5,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mike Chen',
      role: 'Court Owner',
      content: 'Managing my courts and tournaments has never been easier. The analytics help me optimize my business.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Recreational Player',
      content: 'I love how easy it is to find players at my skill level. The match-making system is fantastic!',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen font-poppins">
      <Navbar isLanding={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sport-blue via-sport-green to-sport-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <PickleballLogo size="lg" className="mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Play. Compete. 
                  <span className="text-sport-yellow"> Analyze.</span>
                </h1>
              </div>
              <p className="text-xl mb-8 text-sport-green-light">
                The ultimate platform for pickleball enthusiasts. Connect with players, 
                join tournaments, and elevate your game with advanced analytics.
              </p>
              <div className="text-center lg:text-left">
                <Link
                  to="/signup"
                  className="bg-sport-yellow hover:bg-sport-yellow-dark text-sport-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Pickleball players in action"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-sport-green" />
                  <div>
                    <p className="font-semibold text-sport-blue">15,000+</p>
                    <p className="text-sm text-sport-gray-dark">Active Players</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-sport-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-sport-blue mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-sport-gray-dark max-w-3xl mx-auto">
              From casual games to competitive tournaments, our platform provides all the tools you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-sport-yellow">
                <div className="w-12 h-12 bg-sport-green rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-sport-blue mb-4">{feature.title}</h3>
                <p className="text-sport-gray-dark">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sport-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sport-yellow mb-2">15,000+</div>
              <div className="text-sport-green-light">Active Players</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sport-yellow mb-2">2,500+</div>
              <div className="text-sport-green-light">Matches Played</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sport-yellow mb-2">150+</div>
              <div className="text-sport-green-light">Tournaments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sport-yellow mb-2">50+</div>
              <div className="text-sport-green-light">Partner Courts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-sport-blue mb-4">
              What Players Say
            </h2>
            <p className="text-xl text-sport-gray-dark max-w-3xl mx-auto">
              Join thousands of satisfied players who have found their perfect pickleball community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-sport-gray p-8 rounded-xl shadow-lg border-l-4 border-sport-green">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-sport-yellow fill-current" />
                  ))}
                </div>
                <p className="text-sport-gray-dark mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-sport-blue">{testimonial.name}</p>
                    <p className="text-sport-gray-dark text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sport-green to-sport-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <PickleballLogo size="xl" className="mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-xl mb-8 text-sport-green-light">
            Join our community today and start playing, competing, and analyzing your pickleball journey.
          </p>
          <Link
            to="/signup"
            className="bg-sport-yellow hover:bg-sport-yellow-dark text-sport-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sport-blue-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <PickleballLogo size="md" />
                <span className="text-xl font-bold">PickleBall Pro</span>
              </div>
              <p className="text-sport-green-light mb-4">
                The ultimate platform for pickleball enthusiasts to connect, compete, and grow their game.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sport-green-light">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sport-green-light">
                <p>Email: info@pickleballpro.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Sports Ave, City, ST 12345</p>
              </div>
            </div>
          </div>
          <div className="border-t border-sport-blue mt-8 pt-8 text-center text-sport-green-light">
            <p>&copy; 2024 PickleBall Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;