import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Long exposure light trails",
    caption: "Long Exposure Physics"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Water droplets as natural lenses",
    caption: "Natural Lens Optics"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Crystal showing light refraction",
    caption: "Light Refraction"
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1489370603040-dc6c28a1d37a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Film negatives and photochemical process",
    caption: "Film Chemistry"
  },
];

export default function ImageGallery() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-primary font-sans">Photo Showcase</h3>
        <button className="text-secondary hover:text-indigo-700 font-sans font-medium">
          View All Gallery →
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-sans bg-black bg-opacity-50 px-2 py-1 rounded">
                    {item.caption}
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <div className="relative">
                <img
                  src={item.src.replace('w=400&h=400', 'w=1200&h=800')}
                  alt={item.alt}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4">
                  <h4 className="text-lg font-semibold font-sans">{item.caption}</h4>
                  <p className="text-gray-600 text-sm mt-2">{item.alt}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
