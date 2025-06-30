import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';



const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4 flex flex-col items-start">
            <div className="flex flex-col items-start space-y-2 md:space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 flex items-center justify-start bg-white rounded-full">
                  <img
                    src="/logo.png"
                    alt="Aerospace Explained Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="text-left md:ml-4">
                  <h3 className="text-xl font-bold text-left">Aerospace Explained</h3>
                  <p className="text-gray-400 text-sm text-left">Your Guide to the World Above</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-left pt-4 md:pt-0">
                Demystifying aerospace and aviation one concept at a time, through creativity, clarity and engaging storytelling.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-start text-left md:ml-16 w-full">
            <h4 className="text-lg font-semibold mb-8 text-center">Categories</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
              {['Aerodynamics ', 'Propulsion ', 'Structures ', 'Materials ', 'Systems ','CAD',].map((category) => (
                <li key={category}>
                  <span className="text-gray-300">{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start text-left mt-6 md:mt-0 md:ml-10 md:pl-4">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">maxwelogola@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+254 (114) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Nairobi, KE</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="https://x.com/Ogola_Maxwel/" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ogola-maxwel/" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/maxwell.pressy/" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/max_pressy/" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-16 pt-10 pb-2">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-center">
            <p className="text-gray-400">
              © 2025 Aerospace Explained. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 justify-center">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


