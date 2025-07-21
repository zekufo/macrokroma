import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Camera, Plus } from "lucide-react";
import { Link } from "wouter";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

          {/* Manage Images */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Image Gallery</CardTitle>
              <CardDescription>
                View and manage uploaded images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/gallery">
                <Button variant="outline" className="w-full">
                  View Gallery
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