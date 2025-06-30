import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const res = await fetch('http://localhost:4000/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          setIsSubscribed(true);
          setEmail('');
          setTimeout(() => setIsSubscribed(false), 3000);
        } else {
          alert('Failed to subscribe. Please try again.');
        }
      } catch {
        alert('Network error. Please try again.');
      }
    }
  };

  return (
    <section id="newsletter" className="bg-gradient-to-r from-blue-800 to-blue-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-full">
            <Mail className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Stay Updated with Aerospace Academia
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Learn something new each week! Get clear, easy-to-understand aerospace lessons, updates, 
          and industry news right in your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
              required
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
        </form>
        
        <p className="text-sm text-blue-200 mt-4">
          No spam, unsubscribe anytime. Join 500+ aerospace professionals.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;