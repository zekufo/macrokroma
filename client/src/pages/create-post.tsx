import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, Upload, Save, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import RichTextEditor from "@/components/rich-text-editor";
import { insertPostSchema } from "@shared/schema";
import { Link } from "wouter";

const createPostSchema = insertPostSchema.extend({
  category: z.enum(["digital", "film", "optics", "technique"]),
});

type CreatePostData = z.infer<typeof createPostSchema>;

export default function CreatePost() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "digital",
      published: false,
      readTime: 5,
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostData) => {
      // First upload cover image if provided
      let coverImageUrl = "";
      if (coverImageFile) {
        const formData = new FormData();
        formData.append("image", coverImageFile);
        const imageResponse = await apiRequest("/api/images", { method: "POST", body: formData });
        const imageData = await imageResponse.json();
        coverImageUrl = imageData.url;
      }

      // Create the post
      const postData = {
        ...data,
        content,
        coverImage: coverImageUrl || undefined,
      };

      const response = await apiRequest("/api/posts", { method: "POST", body: JSON.stringify(postData), headers: { "Content-Type": "application/json" } });
      return response.json();
    },
    onSuccess: (post) => {
      toast({
        title: "Post created successfully!",
        description: "Your article has been published.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setLocation(`/post/${post.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CreatePostData) => {
    createPostMutation.mutate(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="p-0 hover:bg-transparent text-secondary hover:text-indigo-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-sans">
                    {isPreview ? "Preview Article" : "Create New Article"}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsPreview(!isPreview)}
                      className="font-sans"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isPreview ? "Edit" : "Preview"}
                    </Button>
                    <Button
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={createPostMutation.isPending}
                      className="bg-secondary hover:bg-indigo-700 font-sans"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {createPostMutation.isPending ? "Publishing..." : "Publish"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isPreview ? (
                  <>
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="font-sans font-medium">Article Title</Label>
                      <Input
                        id="title"
                        {...form.register("title")}
                        placeholder="Enter a compelling title..."
                        className="mt-2 font-sans text-lg"
                      />
                      {form.formState.errors.title && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <Label htmlFor="excerpt" className="font-sans font-medium">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        {...form.register("excerpt")}
                        placeholder="Brief summary of your article..."
                        className="mt-2 font-sans"
                        rows={3}
                      />
                      {form.formState.errors.excerpt && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.excerpt.message}</p>
                      )}
                    </div>

                    {/* Content Editor */}
                    <div>
                      <Label className="font-sans font-medium">Content</Label>
                      <div className="mt-2">
                        <RichTextEditor
                          content={content}
                          onChange={setContent}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* Preview Mode */
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold text-primary font-sans mb-4">
                        {form.watch("title") || "Article Title"}
                      </h1>
                      <p className="text-xl text-gray-600 mb-6">
                        {form.watch("excerpt") || "Article excerpt will appear here..."}
                      </p>
                      {coverImageFile && (
                        <img
                          src={URL.createObjectURL(coverImageFile)}
                          alt="Cover"
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                    </div>
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: content || "<p>Article content will appear here...</p>" }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-lg">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <div>
                  <Label className="font-sans font-medium">Category</Label>
                  <Select
                    value={form.watch("category")}
                    onValueChange={(value) => form.setValue("category", value as any)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital Photography</SelectItem>
                      <SelectItem value="film">Film Photography</SelectItem>
                      <SelectItem value="optics">Optics & Physics</SelectItem>
                      <SelectItem value="technique">Technique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Read Time */}
                <div>
                  <Label htmlFor="readTime" className="font-sans font-medium">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    {...form.register("readTime", { valueAsNumber: true })}
                    min="1"
                    className="mt-2"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <Label className="font-sans font-medium">Cover Image</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="cover-image"
                    />
                    <Label
                      htmlFor="cover-image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      {coverImageFile ? (
                        <img
                          src={URL.createObjectURL(coverImageFile)}
                          alt="Cover preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload cover image</p>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-lg">Writing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Use clear, descriptive headings</li>
                  <li>• Include relevant physics equations</li>
                  <li>• Add captions to explain images</li>
                  <li>• Keep technical content accessible</li>
                  <li>• Use examples from real photography</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
