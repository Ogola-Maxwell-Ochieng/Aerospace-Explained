import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import BlogCard from './components/BlogCard';
import BlogPost from './components/BlogPost';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ArticlesPage from './components/ArticlesPage';
import { blogPosts } from './data/mockData';
import { BlogPost as BlogPostType } from './types/blog';

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
      
      const matchesCategory = categoryFilter === '' || post.category === categoryFilter;
      
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return (
      <BlogPost
        post={selectedPost}
        onBack={handleBackToList}
        relatedPosts={getRelatedPosts(selectedPost)}
        onRelatedPostClick={handlePostClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchQuery}
        onCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              {/* --- FEATURED ARTICLES FULL WIDTH --- */}
              {featuredPosts.length > 0 && !searchQuery && !categoryFilter && (
                <section className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">Featured Articles</h2>
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
                  </div>
                </section>
              )}

              {/* Search/Filter Results Header */}
              {(searchQuery || categoryFilter) && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 
                     `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Articles`}
                  </h2>
                  <p className="text-gray-600">
                    Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Regular Posts */}
              <section id="latest-articles">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {!searchQuery && !categoryFilter && (
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(searchQuery || categoryFilter ? filteredPosts : regularPosts)
                      .slice(0, !searchQuery && !categoryFilter ? 9 : undefined)
                      .map(post => (
                        <BlogCard
                          key={post.id}
                          post={post}
                          onClick={handlePostClick}
                          featured={false}
                        />
                      ))}
                  </div>
                  {!searchQuery && !categoryFilter && regularPosts.length > 9 && (
                    <div className="flex justify-center mt-8 mb-8">
                      <button
                        onClick={() => navigate('/articles')}
                        className="bg-blue-600 text-white px-10 py-3 rounded-2xl hover:bg-blue-700 transition-colors duration-200"
                      >
                        Read More
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </>
          }
        />
        <Route
          path="/articles"
          element={<ArticlesPage onPostClick={handlePostClick} />}
        />
      </Routes>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
