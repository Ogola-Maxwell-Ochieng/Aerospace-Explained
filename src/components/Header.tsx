import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onCategoryFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['All', 'Aerodynamics', 'Propulsion', 'Structure', 'Materials', 'Systems', 'CAD',];

  const handleCategoryClick = (category: string) => {
    onCategoryFilter(category.toLowerCase() === 'all' ? '' : category.toLowerCase());
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-200 shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-0 min-h-0" style={{ minHeight: 0 }}>
          {/* Logo */}
          <div className="w-20 h-20 flex items-center justify-center relative overflow-visible">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0 }}
              aria-label="Refresh Page"
            >

              <img
                src="/logo.png"
                alt="Aerospace Materials Logo"
                className="w-36 h-36 object-contain -my-12"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) =>
              category === 'All' ? (
                <Link
                  key={category}
                  to="/"
                  replace
                  className="block w-full text-left px-3 py-2 text-gray-700 font-medium italic tracking-wide text-sm rounded-md hover:text-blue-600 hover:bg-blue-50 transition"
                  style={{ fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif" }}
                  onClick={() => {
                    // Only call filter if not already on "/"
                    onCategoryFilter('');
                  }}
                >
                  {category}
                </Link>
              ) : (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="block w-full text-left px-3 py-2 text-gray-700 font-medium italic tracking-wide text-sm rounded-md hover:text-blue-600 hover:bg-blue-50 transition"
                  style={{ fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif" }}
                >
                  {category}
                </button>
              )
            )}
          </nav>

          {/* Subscribe Button (Desktop) */}
          <button
            type="button"
            className="hidden md:inline-flex items-center px-12 py-3 bg-blue-800 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base"
            style={{ minWidth: '140px' }}
            onClick={() => {
              const el = document.getElementById('newsletter');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.hash = '#newsletter';
              }
            }}
          >
            Subscribe
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              {categories.map((category) =>
                category === 'All' ? (
                  <Link
                    key={category}
                    to="/"
                    replace
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    onClick={() => {
                      onCategoryFilter('');
                      setIsMenuOpen(false);
                    }}
                  >
                    {category}
                  </Link>
                ) : (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    {category}
                  </button>
                )
              )}
            </div>
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                className="w-full max-w-xs px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base"
                style={{ minWidth: '140px' }}
                onClick={() => {
                  const el = document.getElementById('newsletter');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = '#newsletter';
                  }
                  setIsMenuOpen(false);
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
