import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BlogCard from './BlogCard';
import { blogPosts } from '../data/mockData';
import { BlogPost as BlogPostType } from '../types/blog';

const ArticlesPage: React.FC<{
  onPostClick: (post: BlogPostType) => void;
  onCategoryFilter?: (category: string) => void;
  activeCategory?: string;
}> = ({ onPostClick, onCategoryFilter, activeCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Reset filter when route is "/"
  useEffect(() => {
    if (location.pathname === '/' && onCategoryFilter) {
      onCategoryFilter('');
    }
  }, [location.pathname, onCategoryFilter]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post =>
      (activeCategory ? post.category.toLowerCase() === activeCategory : true) &&
      (
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, activeCategory]);

  // Scroll to top when this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="py-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left pl-8">
          {activeCategory
            ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Articles`
            : 'All Articles'}
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-4 gap-4">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-10 py-3 rounded-2xl text-base font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Read Less
          </button>
        </div>
        <p className="text-gray-600 mb-8 pl-8">
          Found {filteredPosts.length} article{filteredPosts.length !== 1 && 's'}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={onPostClick}
              featured={false}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ArticlesPage;
