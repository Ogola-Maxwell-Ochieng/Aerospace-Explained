export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
  imageUrl: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  expertise: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}