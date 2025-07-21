import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Image, Sigma } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import 'katex/dist/katex.min.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  postId?: number;
}

export default function RichTextEditor({ content, onChange, postId }: RichTextEditorProps) {
  const { toast } = useToast();
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addToGallery, setAddToGallery] = useState(true);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const insertMath = (isInline: boolean = true) => {
    const mathDelimiter = isInline ? '$' : '$$';
    const placeholder = isInline ? 'equation' : '\\begin{equation}\nequation\n\\end{equation}';
    const mathText = `${mathDelimiter}${placeholder}${mathDelimiter}`;
    
    editor?.chain().focus().insertContent(mathText).run();
    
    toast({
      title: "Math inserted",
      description: `${isInline ? 'Inline' : 'Display'} math equation added. Edit the LaTeX between the $ symbols.`,
    });
  };

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
        setIsImageDialogOpen(true);
      }
    };
    input.click();
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Only add to gallery if toggle is enabled
      if (!addToGallery) {
        formData.append('skipGallery', 'true');
      }
      
      if (postId) {
        formData.append('postId', postId.toString());
      }
      
      const response = await apiRequest("/api/images", { method: "POST", body: formData });
      const imageData = await response.json();
      
      // Insert image into editor
      editor?.chain().focus().insertContent(`<img src="${imageData.url}" alt="${imageData.originalName}" />`).run();
      
      toast({
        title: "Image uploaded",
        description: addToGallery 
          ? "Image has been added to your article and gallery."
          : "Image has been added to your article.",
      });
      
      setIsImageDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 p-2 flex items-center gap-1">
          <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleImageUpload}
          title="Upload Image"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMath(true)}
          title="Insert Inline Math (LaTeX)"
        >
          <Sigma className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMath(false)}
          title="Insert Display Math (LaTeX)"
          className="text-xs px-2"
        >
          $$
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
        </div>
        <EditorContent 
          editor={editor} 
          className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
        />
      </div>

      {/* Image Upload Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Configure how this image should be handled when uploading.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedFile && (
              <div className="flex items-center justify-center w-full h-48 border border-gray-200 rounded-lg">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch
                id="add-to-gallery"
                checked={addToGallery}
                onCheckedChange={setAddToGallery}
              />
              <Label htmlFor="add-to-gallery" className="text-sm">
                Add to gallery (make image discoverable in the gallery section)
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsImageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={uploadImage}>
              Upload Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
