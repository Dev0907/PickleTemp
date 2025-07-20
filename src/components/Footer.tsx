import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-deep-navy text-ivory-whisper py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-lemon-zest rounded-full flex items-center justify-center">
                <span className="text-deep-navy font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold">
                Pickle<span className="text-lemon-zest">Pro</span>
              </span>
            </div>
            <p className="text-ivory-whisper/80 mb-4 max-w-md">
              The ultimate platform for pickleball enthusiasts to connect, compete, and grow their game. 
              Join thousands of players worldwide.
            </p>
            <div className="flex items-center space-x-1 text-sm">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-ivory-whisper/80 hover:text-lemon-zest transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-ivory-whisper/80 hover:text-lemon-zest transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-ivory-whisper/80 text-sm">support@picklepro.in</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-ivory-whisper/20 mt-8 pt-8 text-center">
          <p className="text-ivory-whisper/60 text-sm">
            © 2025 PicklePro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;