import React from 'react';
import { Clock, User, Tag } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, featured = false }) => {
  const cardClasses = featured 
    ? "group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
    : "group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200";

  return (
    <article className={cardClasses + " w-full"} onClick={() => onClick(post)}>
      <div className="relative overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            featured ? 'h-80' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {post.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        <div className="flex items-center space-x-4 mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            post.category === 'Aerodynamics' ? 'bg-blue-100 text-blue-800' :
            post.category === 'Propulsion' ? 'bg-gray-100 text-gray-800' :
            post.category === 'Structures' ? 'bg-orange-100 text-orange-800' :
            post.category === 'Materials' ? 'bg-green-100 text-green-800' :
            post.category === 'Systems' ? 'bg-purple-100 text-purple-800' :
            'bg-red-100 text-red-800'
          }`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>
        
        <p className={`text-gray-600 mb-6 leading-relaxed ${
          featured ? 'text-lg' : ''
        }`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="inline-flex items-center text-xs text-gray-500">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;