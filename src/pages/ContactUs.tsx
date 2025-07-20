import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@picklepro.in',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 98765 43210',
      description: 'Available Monday to Friday, 9 AM to 6 PM IST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Mumbai, Maharashtra, India',
      description: 'Our headquarters in the heart of India'
    }
  ];

  return (
    <div className="min-h-screen bg-ivory-whisper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            Get in <span className="text-ocean-teal">Touch</span>
          </h1>
          <p className="text-xl text-deep-navy/70 max-w-3xl mx-auto">
            Have questions, feedback, or need support? We'd love to hear from you. 
            Our team is here to help you make the most of your PicklePro experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-deep-navy mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-ocean-teal mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-deep-navy mb-2">Message Sent!</h3>
                <p className="text-deep-navy/70">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-sky-mist/20 border rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500' : 'border-sky-mist'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-sky-mist/20 border rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-sky-mist'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-sky-mist/20 border rounded-lg focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-sky-mist'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-deep-navy mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="card-sky p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-lemon-zest rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-deep-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-1">{info.title}</h3>
                      <p className="text-ocean-teal font-medium mb-1">{info.content}</p>
                      <p className="text-deep-navy/70 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-deep-navy mb-4">Our Location</h3>
              <div className="bg-sky-mist/20 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-ocean-teal mx-auto mb-2" />
                  <p className="text-deep-navy/70">Interactive Map Coming Soon</p>
                  <p className="text-sm text-deep-navy/50">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-deep-navy mb-4">Quick Help</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-deep-navy">How do I create a match?</h4>
                  <p className="text-sm text-deep-navy/70">Sign up, go to your dashboard, and click "Create Match".</p>
                </div>
                <div>
                  <h4 className="font-medium text-deep-navy">Is PicklePro free to use?</h4>
                  <p className="text-sm text-deep-navy/70">Yes! Basic features are free. Check our pricing for premium features.</p>
                </div>
                <div>
                  <h4 className="font-medium text-deep-navy">How do I join tournaments?</h4>
                  <p className="text-sm text-deep-navy/70">Browse tournaments and click "Join" on any that match your skill level.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;