import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Images, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

export default function HeroSection() {
  const { data: posts } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  const latestPost = posts?.[0];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6 font-sans">
              physics + photography
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Where fundamental principles of light, matter, and energy transform into images that move people. Understanding first principles makes your photography transcend technique and become art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button className="bg-secondary text-white hover:bg-indigo-700 font-sans font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Latest Articles
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-sans font-medium">
                  <Images className="w-4 h-4 mr-2" />
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Camera lens optical elements"
              className="rounded-xl shadow-2xl w-full"
            />
            {latestPost && (
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm text-gray-800">Latest Post</p>
                    <p className="text-xs text-gray-600">{latestPost.title}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
