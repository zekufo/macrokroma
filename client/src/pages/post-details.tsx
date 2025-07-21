import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Tag, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/header";
import type { Post } from "@shared/schema";

export default function PostDetails() {
  const [match, params] = useRoute("/post/:id");
  const postId = params?.id;

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ['/api/posts', postId],
    enabled: !!postId,
  });

  const categoryColors = {
    digital: "bg-blue-100 text-blue-700",
    film: "bg-green-100 text-green-700",
    optics: "bg-purple-100 text-purple-700",
    technique: "bg-orange-100 text-orange-700",
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="p-0 hover:bg-transparent text-secondary hover:text-indigo-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ) : post ? (
          <>
            {/* Article header */}
            <header className="mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={`${categoryColors[post.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'} font-sans font-medium`}>
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)} Photography
                </Badge>
                <span className="text-gray-400 text-sm">•</span>
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6 font-sans leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Author info and actions */}
              <div className="flex items-center justify-between border-t border-b border-gray-200 py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-sans font-medium text-gray-800">Dr. Sarah Chen</p>
                    <p className="text-sm text-gray-500">Optical Engineer & Photography Researcher</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="font-sans">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="font-sans">
                    Share
                  </Button>
                </div>
              </div>
            </header>

            {/* Cover image */}
            {post.coverImage && (
              <div className="mb-12">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Article content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Tagged in:</span>
                  <Badge variant="secondary" className="font-sans">
                    {post.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="font-sans">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save Article
                  </Button>
                </div>
              </div>
            </footer>
          </>
        ) : null}
      </article>
    </div>
  );
}
