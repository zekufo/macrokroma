import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import type { Image, Post } from "@shared/schema";

interface GalleryItemWithPost extends Image {
  postTitle?: string;
}

export default function ImageGallery() {
  const [randomImages, setRandomImages] = useState<GalleryItemWithPost[]>([]);

  const { data: images } = useQuery<Image[]>({
    queryKey: ['/api/images'],
    queryFn: async () => {
      const response = await fetch('/api/images');
      if (!response.ok) throw new Error('Failed to fetch images');
      return response.json();
    },
  });

  const { data: posts } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  // Randomize images on mount and when data changes
  useEffect(() => {
    if (images && posts) {
      // Create a map of postId to post title
      const postTitleMap = posts.reduce((acc, post) => {
        acc[post.id] = post.title;
        return acc;
      }, {} as Record<number, string>);

      // Filter images that have associated posts and add post titles
      const imagesWithPosts: GalleryItemWithPost[] = images
        .filter(img => img.postId && postTitleMap[img.postId])
        .map(img => ({
          ...img,
          postTitle: postTitleMap[img.postId!]
        }));

      // Randomly select 4 images
      const shuffled = [...imagesWithPosts].sort(() => 0.5 - Math.random());
      setRandomImages(shuffled.slice(0, 4));
    }
  }, [images, posts]);

  if (!randomImages.length) {
    return null;
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-primary font-sans">Photo Showcase</h3>
        <Link href="/gallery">
          <button className="text-secondary hover:text-indigo-700 font-sans font-medium">
            View All Gallery →
          </button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {randomImages.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={`/uploads/${item.filename}`}
                  alt={item.originalName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-sans bg-black bg-opacity-50 px-2 py-1 rounded">
                    {item.postTitle || item.caption || item.originalName}
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <div className="relative">
                <img
                  src={`/uploads/${item.filename}`}
                  alt={item.originalName}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4">
                  <h4 className="text-lg font-semibold font-sans">{item.postTitle || item.caption || item.originalName}</h4>
                  {item.caption && item.caption !== item.postTitle && (
                    <p className="text-gray-600 text-sm mt-2">{item.caption}</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
