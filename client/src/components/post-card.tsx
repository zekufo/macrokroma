import { Link } from "wouter";
import { Clock, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const categoryColors = {
  digital: "bg-blue-100 text-blue-700",
  film: "bg-green-100 text-green-700",
  optics: "bg-purple-100 text-purple-700",
  technique: "bg-orange-100 text-orange-700",
};

export default function PostCard({ post, featured = false }: PostCardProps) {
  const categoryColor = categoryColors[post.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700";

  if (featured) {
    return (
      <Card className="bg-white border border-gray-200 rounded-xl shadow-lg mb-12 overflow-hidden hover:shadow-xl transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-white font-sans font-medium">
                Featured
              </Badge>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={`${categoryColor} font-sans font-medium`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)} Photography
              </Badge>
              <span className="text-gray-400 text-sm">•</span>
              <time className="text-gray-500 text-sm font-sans">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <Link href={`/post/${post.id}`}>
              <h4 className="text-2xl font-bold text-primary mb-4 font-sans hover:text-secondary transition-colors cursor-pointer">
                {post.title}
              </h4>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-sans font-medium text-sm text-gray-800">Dr. Sarah Chen</p>
                  <p className="text-xs text-gray-500">Optical Engineer</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <span className="flex items-center space-x-1 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </span>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-secondary">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Badge className={`${categoryColor} font-sans font-medium`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)} Photography
          </Badge>
          <time className="text-gray-500 text-sm font-sans">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>
        <Link href={`/post/${post.id}`}>
          <h5 className="text-lg font-bold text-primary mb-3 font-sans hover:text-secondary transition-colors cursor-pointer">
            {post.title}
          </h5>
        </Link>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm font-sans">{post.readTime} min read</span>
          <Link href={`/post/${post.id}`}>
            <Button variant="ghost" className="text-secondary hover:text-indigo-700 font-sans font-medium text-sm p-0">
              Read more →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
