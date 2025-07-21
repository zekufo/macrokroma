import { posts, images, type Post, type InsertPost, type Image, type InsertImage } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, desc } from "drizzle-orm";

export interface IStorage {
  // Posts
  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostsByCategory(category: string): Promise<Post[]>;
  searchPosts(query: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // Images
  getImages(): Promise<Image[]>;
  getImage(id: number): Promise<Image | undefined>;
  getImagesByPost(postId: number): Promise<Image[]>;
  createImage(image: InsertImage): Promise<Image>;
  deleteImage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getPosts(): Promise<Post[]> {
    const result = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return result;
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    const result = await db.select().from(posts)
      .where(eq(posts.category, category))
      .orderBy(desc(posts.createdAt));
    return result;
  }

  async searchPosts(query: string): Promise<Post[]> {
    const result = await db.select().from(posts)
      .where(
        or(
          ilike(posts.title, `%${query}%`),
          ilike(posts.excerpt, `%${query}%`),
          ilike(posts.content, `%${query}%`)
        )
      )
      .orderBy(desc(posts.createdAt));
    return result;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updatePost(id: number, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post || undefined;
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id));
    return result.rowCount > 0;
  }

  async getImages(): Promise<Image[]> {
    const result = await db.select().from(images).orderBy(desc(images.createdAt));
    return result;
  }

  async getImage(id: number): Promise<Image | undefined> {
    const [image] = await db.select().from(images).where(eq(images.id, id));
    return image || undefined;
  }

  async getImagesByPost(postId: number): Promise<Image[]> {
    const result = await db.select().from(images)
      .where(eq(images.postId, postId))
      .orderBy(desc(images.createdAt));
    return result;
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const [image] = await db
      .insert(images)
      .values(insertImage)
      .returning();
    return image;
  }

  async deleteImage(id: number): Promise<boolean> {
    const result = await db.delete(images).where(eq(images.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
