// Cloudflare Worker entry point for the API
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors({
  origin: ['https://macrokroma.pages.dev', 'https://macrokroma.com'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// API routes will be implemented here
app.get('/api/posts', async (c) => {
  try {
    const { category, search } = c.req.query();
    
    // D1 database queries will be implemented here
    // For now, return a simple response
    return c.json([]);
  } catch (error) {
    return c.json({ error: 'Failed to fetch posts' }, 500);
  }
});

app.get('/api/posts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    // Implementation will go here
    return c.json({ id });
  } catch (error) {
    return c.json({ error: 'Failed to fetch post' }, 500);
  }
});

app.post('/api/posts', async (c) => {
  try {
    const body = await c.req.json();
    // Implementation will go here
    return c.json({ message: 'Post created' }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create post' }, 400);
  }
});

// Image upload endpoint
app.post('/api/images', async (c) => {
  try {
    // R2 storage implementation will go here
    return c.json({ message: 'Image uploaded' }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to upload image' }, 400);
  }
});

export default app;