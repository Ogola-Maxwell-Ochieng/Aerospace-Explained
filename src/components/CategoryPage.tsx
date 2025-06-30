import { useParams } from 'react-router-dom';
import BlogCard from './BlogCard';
import { blogPosts } from '../data/mockData';

const CategoryPage = () => {
  const { category } = useParams();
  const filteredPosts = blogPosts.filter(
    (post) => post.category.toLowerCase() === category?.toLowerCase()
  );

  const formattedCategory =
    category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  return (
    <main className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {formattedCategory} Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                featured={true}
                onClick={() => {}}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No articles found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;