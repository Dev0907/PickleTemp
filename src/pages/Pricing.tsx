import React from 'react';
import { Check, Star, Crown, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for casual players getting started',
      icon: Users,
      color: 'sky-mist',
      features: [
        'Join matches',
        'Create profile',
        'Basic player search',
        'Community access',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 5 matches per month',
        'Basic support only'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro Player',
      price: '₹199',
      period: 'per month',
      description: 'For serious players who want to improve',
      icon: Star,
      color: 'lemon-zest',
      features: [
        'Unlimited match creation',
        'Advanced player matching',
        'Game video upload',
        'AI performance analysis',
        'Detailed statistics',
        'Priority support',
        'Tournament notifications',
        'Custom skill tracking'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Club Owner',
      price: '₹499',
      period: 'per month',
      description: 'Complete solution for club and tournament management',
      icon: Crown,
      color: 'ocean-teal',
      features: [
        'Create tournaments',
        'Manage multiple courts',
        'Player database management',
        'Revenue analytics',
        'Custom branding',
        'Bulk player invitations',
        'Advanced reporting',
        'Dedicated account manager',
        'API access',
        'White-label options'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes, we offer a 14-day free trial for both Pro Player and Club Owner plans.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, and net banking.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel anytime. You\'ll continue to have access until the end of your billing period.'
    }
  ];

  const getCardColor = (color: string) => {
    switch (color) {
      case 'sky-mist': return 'bg-sky-mist/20 border-sky-mist';
      case 'lemon-zest': return 'bg-lemon-zest/20 border-lemon-zest';
      case 'ocean-teal': return 'bg-ocean-teal/20 border-ocean-teal';
      default: return 'bg-sky-mist/20 border-sky-mist';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'sky-mist': return 'bg-sky-mist text-deep-navy';
      case 'lemon-zest': return 'bg-lemon-zest text-deep-navy';
      case 'ocean-teal': return 'bg-ocean-teal text-ivory-whisper';
      default: return 'bg-sky-mist text-deep-navy';
    }
  };

  const getButtonStyle = (color: string) => {
    switch (color) {
      case 'sky-mist': return 'btn-secondary';
      case 'lemon-zest': return 'btn-accent';
      case 'ocean-teal': return 'btn-primary';
      default: return 'btn-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-ivory-whisper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            Choose Your <span className="text-ocean-teal">Plan</span>
          </h1>
          <p className="text-xl text-deep-navy/70 max-w-3xl mx-auto">
            Whether you're a casual player or managing a club, we have the perfect plan for your pickleball journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative card border-2 p-8 ${getCardColor(plan.color)} ${
                plan.popular ? 'transform scale-105 shadow-2xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-lemon-zest text-deep-navy px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${getIconColor(plan.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-deep-navy mb-2">{plan.name}</h3>
                <p className="text-deep-navy/70 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-deep-navy">{plan.price}</span>
                  <span className="text-deep-navy/60 ml-2">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-ocean-teal mr-3 flex-shrink-0" />
                    <span className="text-deep-navy">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-center opacity-60">
                    <span className="w-5 h-5 mr-3 flex-shrink-0 text-center">•</span>
                    <span className="text-deep-navy text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className={`${getButtonStyle(plan.color)} w-full text-center block`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card p-8 mb-16">
          <h2 className="text-2xl font-bold text-deep-navy text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sky-mist">
                  <th className="text-left py-4 px-4 text-deep-navy font-semibold">Features</th>
                  <th className="text-center py-4 px-4 text-deep-navy font-semibold">Free</th>
                  <th className="text-center py-4 px-4 text-deep-navy font-semibold">Pro Player</th>
                  <th className="text-center py-4 px-4 text-deep-navy font-semibold">Club Owner</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Match Creation', '5/month', 'Unlimited', 'Unlimited'],
                  ['Tournament Management', '✗', '✗', '✓'],
                  ['AI Analysis', '✗', '✓', '✓'],
                  ['Advanced Analytics', '✗', '✓', '✓'],
                  ['Priority Support', '✗', '✓', '✓'],
                  ['Custom Branding', '✗', '✗', '✓'],
                  ['API Access', '✗', '✗', '✓']
                ].map((row, index) => (
                  <tr key={index} className="border-b border-sky-mist/30">
                    <td className="py-3 px-4 text-deep-navy font-medium">{row[0]}</td>
                    <td className="py-3 px-4 text-center text-deep-navy/70">{row[1]}</td>
                    <td className="py-3 px-4 text-center text-deep-navy/70">{row[2]}</td>
                    <td className="py-3 px-4 text-center text-deep-navy/70">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-deep-navy text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-semibold text-deep-navy mb-2">{faq.question}</h3>
                <p className="text-deep-navy/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-sky p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-deep-navy mb-4">Still have questions?</h2>
            <p className="text-deep-navy/70 mb-6">
              Our team is here to help you choose the right plan for your needs.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;