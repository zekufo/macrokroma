import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Grid, List, Upload, Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Image } from "@shared/schema";

export default function Gallery() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { toast } = useToast();

  const { data: images, isLoading } = useQuery<Image[]>({
    queryKey: ['/api/images'],
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageId: number) => apiRequest(`/api/images/${imageId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
      toast({
        title: "Image deleted",
        description: "The image has been removed from the gallery.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteImage = (imageId: number, filename: string) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"? This will remove it from the gallery but not from any blog posts.`)) {
      deleteImageMutation.mutate(imageId);
    }
  };

  const displayImages = images || [];

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary font-sans mb-2">Photo Gallery</h1>
            <p className="text-gray-600">
              Technical photography demonstrating physics principles in action
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Upload Button */}
            <Button className="bg-secondary hover:bg-indigo-700 font-sans">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {["all", "digital", "film"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="font-sans"
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={viewMode === "grid" ? "space-y-3" : "flex space-x-4"}>
                <Skeleton className={viewMode === "grid" ? "aspect-square rounded-lg" : "w-32 h-24 rounded-lg"} />
                {viewMode === "list" && (
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayImages.map((image) => (
              <div key={image.id} className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={`/uploads/${image.filename}`}
                          alt={image.caption || image.originalName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {image.postId && (
                          <Badge className="absolute top-2 left-2 bg-secondary text-white text-xs">
                            From Article
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                            View Details
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm text-gray-900 font-sans mb-1 line-clamp-2">
                          {image.caption || image.originalName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(image.size)} • {new Date(image.createdAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                <DialogContent className="max-w-4xl w-full">
                  <div className="space-y-4">
                    <img
                      src={`/uploads/${image.filename}`}
                      alt={image.caption || image.originalName}
                      className="w-full h-auto rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold font-sans mb-2">
                        {image.caption || image.originalName}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">File size:</span> {formatFileSize(image.size)}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {image.mimeType}
                        </div>
                        <div>
                          <span className="font-medium">Uploaded:</span> {new Date(image.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Filename:</span> {image.filename}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
                </Dialog>

              </div>
            ))}
          </div>
        )}

        {/* Gallery List */}
        {!isLoading && viewMode === "list" && (
          <div className="space-y-4">
            {displayImages.map((image) => (
              <Card key={image.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/uploads/${image.filename}`}
                      alt={image.caption || image.originalName}
                      className="w-24 h-18 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 font-sans mb-1">
                        {image.caption || image.originalName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {image.filename}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{formatFileSize(image.size)}</span>
                        <span>•</span>
                        <span>{image.mimeType}</span>
                        <span>•</span>
                        <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {image.postId && (
                        <Badge variant="outline" className="text-xs">
                          From Article
                        </Badge>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="font-sans">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full">
                          <div className="space-y-4">
                            <img
                              src={`/uploads/${image.filename}`}
                              alt={image.caption || image.originalName}
                              className="w-full h-auto rounded-lg"
                            />
                            <div>
                              <h3 className="text-xl font-semibold font-sans mb-2">
                                {image.caption || image.originalName}
                              </h3>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">File size:</span> {formatFileSize(image.size)}
                                </div>
                                <div>
                                  <span className="font-medium">Type:</span> {image.mimeType}
                                </div>
                                <div>
                                  <span className="font-medium">Uploaded:</span> {new Date(image.createdAt).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium">Filename:</span> {image.filename}
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayImages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-sans mb-2">No images yet</h3>
            <p className="text-gray-600 mb-6">Start building your photography physics gallery by uploading your first image.</p>
            <Button className="bg-secondary hover:bg-indigo-700 font-sans">
              <Upload className="w-4 h-4 mr-2" />
              Upload First Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
