import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Trophy, Target, ArrowRight, Star, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Play,
      title: 'Match Creation and Joining',
      description: 'Easily create matches or join existing ones with players at your skill level'
    },
    {
      icon: Trophy,
      title: 'Tournament Registration',
      description: 'Participate in competitive tournaments and track your progress'
    },
    {
      icon: Target,
      title: 'Game Video Upload & AI Analysis',
      description: 'Upload your game videos and get detailed AI-powered performance insights'
    },
    {
      icon: Users,
      title: 'Player Connection & Level-Based Matchmaking',
      description: 'Connect with players worldwide and find matches based on your skill level'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Tournament Player',
      content: 'PicklePro has revolutionized how I find competitive matches. The AI analysis helped improve my game significantly!',
      rating: 5,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mike Chen',
      role: 'Club Owner',
      content: 'Managing tournaments has never been easier. The platform streamlined our entire operation.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Recreational Player',
      content: 'I love how easy it is to find players at my level. The community is amazing and welcoming!',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Active Players' },
    { number: '2,500+', label: 'Matches Played' },
    { number: '150+', label: 'Tournaments' },
    { number: '50+', label: 'Partner Courts' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-teal via-sky-mist to-ocean-teal text-ivory-whisper py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Connect. Compete. 
                <span className="text-lemon-zest"> Conquer</span> Pickleball with PicklePro.
              </h1>
              <p className="text-xl mb-8 text-ivory-whisper/90">
                Create matches, join tournaments, and analyze your game like a pro. 
                The ultimate platform for passionate pickleball players.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/join-match"
                  className="btn-accent text-lg inline-flex items-center justify-center"
                >
                  Join a Match
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/create-match"
                  className="btn-secondary text-lg inline-flex items-center justify-center"
                >
                  Create a Match
                  <Play className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img
                src="https://images.pexels.com/photos/6224459/pexels-photo-6224459.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Pickleball players in action"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-ivory-whisper p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-ocean-teal" />
                  <div>
                    <p className="font-semibold text-deep-navy">15,000+</p>
                    <p className="text-sm text-deep-navy/70">Active Players</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-ocean-teal text-ivory-whisper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-bounce-gentle">
                <div className="text-4xl font-bold text-lemon-zest mb-2">{stat.number}</div>
                <div className="text-ivory-whisper/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-ivory-whisper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-deep-navy/70 max-w-3xl mx-auto">
              From casual games to competitive tournaments, our platform provides all the tools you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-sky p-8 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-lemon-zest rounded-lg flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-6 h-6 text-deep-navy" />
                </div>
                <h3 className="text-xl font-semibold text-deep-navy mb-4">{feature.title}</h3>
                <p className="text-deep-navy/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-sky-mist/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4">
              What Players Say
            </h2>
            <p className="text-xl text-deep-navy/70 max-w-3xl mx-auto">
              Join thousands of satisfied players who have found their perfect pickleball community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 border-l-4 border-lemon-zest">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-lemon-zest fill-current" />
                  ))}
                </div>
                <p className="text-deep-navy/80 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-deep-navy">{testimonial.name}</p>
                    <p className="text-deep-navy/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean-teal to-sky-mist text-ivory-whisper">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="w-20 h-20 bg-lemon-zest rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-deep-navy font-bold text-3xl">P</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-xl mb-8 text-ivory-whisper/90">
            Join our community today and start playing, competing, and analyzing your pickleball journey.
          </p>
          <Link
            to="/signup"
            className="btn-accent text-lg inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;