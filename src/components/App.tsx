import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import BlogCard from './BlogCard';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { blogPosts } from '../data/mockData';
import { BlogPost as BlogPostType } from '../types/blog';
import CategoryPage from './CategoryPage';
import ArticlesPage from './ArticlesPage';
import BlogPost from './BlogPost';

function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === '' || post.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getRelatedPosts = (currentPost: BlogPostType) => {
    return blogPosts
      .filter(post => 
        post.id !== currentPost.id && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  const handlePostClick = (post: BlogPostType) => {
    setSelectedPost(post);
    navigate(`/article/${post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchQuery}
        onCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
      />

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <Hero />

              {featuredPosts.length > 0 && !searchQuery && !categoryFilter && (
                <section className="featured-full-width py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredPosts.map(post => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onClick={handlePostClick}
                        featured={true}
                      />
                    ))}
                  </div>
                </section>
              )}

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {(searchQuery || categoryFilter) && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {searchQuery ? `Search Results for "${searchQuery}"` : `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Articles`}
                    </h2>
                    <p className="text-gray-600">
                      Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                {!searchQuery && !categoryFilter && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
                )}

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search terms or browse different categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('');
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      View All Articles
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(searchQuery || categoryFilter ? filteredPosts : regularPosts).map(post => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onClick={handlePostClick}
                        featured={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              <Newsletter />
              <Footer />
            </>
          }
        />

        {/* Category page route */}
        <Route path="/category/:category" element={<CategoryPage />} />

        {/* Articles list */}
        <Route path="/articles" element={<ArticlesPage onPostClick={handlePostClick} />} />

        {/* Blog post view */}
        <Route
          path="/article/:id"
          element={
            selectedPost ? (
              <BlogPost
                post={selectedPost}
                onBack={handleBackToList}
                relatedPosts={getRelatedPosts(selectedPost)}
                onRelatedPostClick={handlePostClick}
              />
            ) : (
              <div className="text-center py-20">No blog post selected.</div>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
