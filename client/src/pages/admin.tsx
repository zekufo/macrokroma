import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lock, Camera, Plus, Trash2, Eye, Edit } from "lucide-react";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Post, Image } from "@shared/schema";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    enabled: isAuthenticated,
  });

  const { data: images, isLoading: isLoadingImages } = useQuery<Image[]>({
    queryKey: ['/api/images'],
    enabled: isAuthenticated,
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => apiRequest(`/api/posts/${postId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      toast({
        title: "Post deleted",
        description: "The article has been successfully removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    },
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

  const handleDeletePost = (postId: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      deletePostMutation.mutate(postId);
    }
  };

  const handleDeleteImage = (imageId: number, filename: string) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"? This will remove it from the gallery but not from any blog posts.`)) {
      deleteImageMutation.mutate(imageId);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this would be server-side
    if (password === "B0ltzm@nnSchr0d1ng3r") { // You can change this password
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Camera className="mx-auto h-12 w-12 text-secondary" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Access</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter password to access macrokroma admin panel
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Authentication Required
              </CardTitle>
              <CardDescription>
                This area is restricted to authorized users only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="mt-1"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <Button type="submit" className="w-full bg-secondary hover:bg-indigo-700">
                  Access Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Camera className="text-secondary text-2xl" />
              <h1 className="text-xl font-bold text-primary">macrokroma Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">View Site</Button>
              </Link>
              <Button onClick={() => setIsAuthenticated(false)} variant="ghost">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage your macrokroma physics blog content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Post */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Post
              </CardTitle>
              <CardDescription>
                Write a new physics article with rich text editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/create">
                <Button className="w-full bg-secondary hover:bg-indigo-700">
                  Start Writing
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* View Public Gallery */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Public Gallery</CardTitle>
              <CardDescription>
                View the public image gallery as visitors see it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/gallery">
                <Button variant="outline" className="w-full">
                  View Public Gallery
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Site Stats */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  View Published Posts
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Edit About Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Manage Posts */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Manage Posts</CardTitle>
              <CardDescription>
                View, edit, and delete your published articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading posts...</div>
              ) : posts && posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{post.category}</Badge>
                          <span className="text-xs text-gray-500">{post.readTime} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/post/${post.id}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDeletePost(post.id, post.title)}
                          disabled={deletePostMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No posts yet. Create your first article to get started!</p>
                  <Link href="/create">
                    <Button className="mt-4 bg-secondary hover:bg-indigo-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Post
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Manage Images */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Manage Images</CardTitle>
              <CardDescription>
                View and delete images from your gallery. Deleting images here removes them from the gallery but not from blog posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingImages ? (
                <div className="text-center py-4">Loading images...</div>
              ) : images && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <Card className="overflow-hidden">
                        <div className="aspect-square relative">
                          <img
                            src={`/uploads/${image.filename}`}
                            alt={image.caption || image.originalName}
                            className="w-full h-full object-cover"
                          />
                          {image.postId && (
                            <Badge className="absolute top-2 left-2 bg-secondary text-white text-xs">
                              From Article
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteImage(image.id, image.originalName)}
                            disabled={deleteImageMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                            {image.caption || image.originalName}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(image.size)} • {new Date(image.createdAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No images yet. Upload images through the rich text editor when creating posts!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Admin Instructions</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>Getting Started</h4>
              <ul>
                <li><strong>Create Posts:</strong> Use the rich text editor to write physics articles</li>
                <li><strong>Categories:</strong> Choose between Digital, Film, or Optics categories</li>
                <li><strong>Images:</strong> Upload images directly in posts or manage them in the gallery</li>
                <li><strong>Publishing:</strong> Posts are published immediately when created</li>
              </ul>
              <h4>Security</h4>
              <ul>
                <li>This admin panel is only accessible via /admin URL</li>
                <li>Password: <code>B0ltzm@nnSchr0d1ng3r</code> (change this in the code)</li>
                <li>Sessions expire when you close the browser</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}