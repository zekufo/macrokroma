import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import PostCard from "@/components/post-card";
import ImageGallery from "@/components/image-gallery";
import type { Post } from "@shared/schema";

export default function Home() {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const category = params.get('category');
    const search = params.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts', selectedCategory === 'all' ? '' : selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  const categories = [
    { id: "all", label: "All", color: "bg-secondary text-white" },
    { id: "digital", label: "Digital Photography", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
    { id: "film", label: "Film Photography", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
    { id: "optics", label: "Optics", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
    { id: "technique", label: "Technique", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
  ];

  const featuredPost = posts?.[0];
  const regularPosts = posts?.slice(1) || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories and filters */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h3 className="text-2xl font-bold text-primary font-sans mb-4 sm:mb-0">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Recent Articles"}
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-sans font-medium cursor-pointer transition-colors ${
                    selectedCategory === category.id ? category.color : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSearchQuery("");
                  }}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="h-64 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {!isLoading && posts && (
          <>
            {/* Featured article */}
            {featuredPost && !searchQuery && selectedCategory === 'all' && (
              <PostCard post={featuredPost} featured />
            )}

            {/* Article grid */}
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {regularPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : !featuredPost && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found.</p>
                {searchQuery && (
                  <p className="text-gray-400 mt-2">Try adjusting your search terms or browse all articles.</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Image Gallery Section */}
        {!searchQuery && selectedCategory === 'all' && <ImageGallery />}

        {/* Newsletter and archive */}
        <section className="bg-gradient-to-r from-secondary to-indigo-700 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 font-sans">Stay Updated with Physics & Photography</h3>
            <p className="text-indigo-100 mb-6">
              Get the latest articles on photographic science, technical tutorials, and equipment reviews delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white font-sans"
              />
              <Button className="bg-white text-secondary hover:bg-gray-100 font-sans font-medium">
                Subscribe
              </Button>
            </div>
            <p className="text-indigo-200 text-sm mt-4">No spam, unsubscribe anytime</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-camera text-secondary text-2xl"></i>
                <h3 className="text-xl font-bold font-sans">macrokroma</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Exploring the intersection of physics, technology, and art in photography. From quantum mechanics to optical engineering.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 font-sans">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/?category=digital" className="hover:text-white transition-colors">Digital Photography</Link></li>
                <li><Link href="/?category=film" className="hover:text-white transition-colors">Film Photography</Link></li>
                <li><Link href="/?category=optics" className="hover:text-white transition-colors">Optics & Physics</Link></li>
                <li><Link href="/?category=technique" className="hover:text-white transition-colors">Equipment Reviews</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 font-sans">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
                <li><Link href="/references" className="hover:text-white transition-colors">Reference Charts</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-sans">
              © 2024 macrokroma. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
