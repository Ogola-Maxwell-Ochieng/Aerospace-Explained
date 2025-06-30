import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '../types/blog';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onPostClick }) => {
  // Separate featured and non-featured posts
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="space-y-12">
      {/* Featured Articles Side by Side */}
      {featuredPosts.length > 0 && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={onPostClick}
              featured
            />
          ))}
        </div>
      )}

      {/* Regular Articles */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={onPostClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
