import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertImageSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Extend Express Request type to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for image uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded images
  app.use("/uploads", (req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, (req, res, next) => {
    const filePath = path.join(uploadDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  });

  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let posts;
      if (search) {
        posts = await storage.searchPosts(search as string);
      } else if (category) {
        posts = await storage.getPostsByCategory(category as string);
      } else {
        posts = await storage.getPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(id, validatedData);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePost(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Images routes
  app.get("/api/images", async (req, res) => {
    try {
      const { postId } = req.query;
      
      let images;
      if (postId) {
        images = await storage.getImagesByPost(parseInt(postId as string));
      } else {
        images = await storage.getImages();
      }
      
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch images" });
    }
  });

  app.post("/api/images", upload.single("image"), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const { caption, postId } = req.body;
      
      const imageData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        caption: caption || null,
        postId: postId ? parseInt(postId) : null,
      };

      const validatedData = insertImageSchema.parse(imageData);
      const image = await storage.createImage(validatedData);
      
      // Return image with URL
      const imageWithUrl = {
        ...image,
        url: `/uploads/${image.filename}`,
      };
      
      res.status(201).json(imageWithUrl);
    } catch (error) {
      res.status(400).json({ message: "Invalid image data" });
    }
  });

  app.delete("/api/images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.getImage(id);
      
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      // Delete file from filesystem
      const filePath = path.join(uploadDir, image.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      const deleted = await storage.deleteImage(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
