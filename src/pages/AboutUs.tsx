import React from 'react';
import { Users, Target, Heart, Award } from 'lucide-react';

const AboutUs = () => {
  const founders = [
    {
      name: 'Dev Parikh',
      role: 'Co-Founder & CEO',
      bio: 'Passionate pickleball player with 8+ years of experience. Former software engineer turned sports entrepreneur, dedicated to building the ultimate platform for pickleball enthusiasts.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      expertise: 'Product Strategy & Business Development'
    },
    {
      name: 'Yug Panchal',
      role: 'Co-Founder & CTO',
      bio: 'Tech visionary with expertise in AI and machine learning. Combines his love for pickleball with cutting-edge technology to create innovative solutions for players worldwide.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      expertise: 'AI/ML & Technical Architecture'
    },
    {
      name: 'Jay Parmar',
      role: 'Co-Founder & COO',
      bio: 'Operations expert and tournament organizer with deep connections in the pickleball community. Ensures seamless user experience and community growth across the platform.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      expertise: 'Operations & Community Building'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in building a strong, inclusive community where every player feels welcome and supported.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our platform features to customer support.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for pickleball drives us to create the best possible experience for players worldwide.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We continuously innovate to bring cutting-edge technology to the pickleball community.'
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-whisper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            About <span className="text-ocean-teal">PicklePro</span>
          </h1>
          <p className="text-xl text-deep-navy/70 max-w-3xl mx-auto">
            We're passionate players building the ultimate platform for passionate players. 
            Our mission is to connect the global pickleball community and help every player reach their potential.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="card p-8 mb-16 text-center bg-sky-mist/20">
          <h2 className="text-3xl font-bold text-deep-navy mb-6">Our Mission</h2>
          <p className="text-lg text-deep-navy/80 max-w-4xl mx-auto leading-relaxed">
            "PicklePro is built by passionate players for passionate players. We simplify match organization, 
            help you find competitive partners, and elevate your game with advanced analytics. Our goal is to 
            make pickleball more accessible, enjoyable, and competitive for everyone."
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-deep-navy text-center mb-12">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="card p-8 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-sky-mist"
                />
                <h3 className="text-xl font-bold text-deep-navy mb-2">{founder.name}</h3>
                <p className="text-ocean-teal font-semibold mb-2">{founder.role}</p>
                <p className="text-lemon-zest/80 text-sm font-medium mb-4">{founder.expertise}</p>
                <p className="text-deep-navy/70 leading-relaxed">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-deep-navy text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-sky p-6 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-lemon-zest rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-deep-navy" />
                </div>
                <h3 className="text-lg font-semibold text-deep-navy mb-3">{value.title}</h3>
                <p className="text-deep-navy/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="card p-8 bg-ocean-teal text-ivory-whisper">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-6">
              PicklePro was born from a simple frustration: finding quality pickleball matches and organizing 
              tournaments was unnecessarily complicated. As avid players ourselves, we experienced firsthand 
              the challenges of connecting with players at the right skill level, coordinating schedules, 
              and tracking performance.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              In 2024, we decided to solve this problem. Combining our expertise in technology, operations, 
              and deep understanding of the pickleball community, we set out to build the platform we wished 
              existed when we started playing.
            </p>
            <p className="text-lg leading-relaxed">
              Today, PicklePro serves thousands of players worldwide, from beginners taking their first steps 
              on the court to professional players competing at the highest levels. We're proud to be part of 
              the pickleball community's incredible growth and excited about the future we're building together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;