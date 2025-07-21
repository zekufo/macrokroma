# macrokroma

A physics photography blog exploring the technical aspects of digital and film photography.

## Features

- **Physics-focused content**: Articles about quantum efficiency, silver halide chemistry, and optical physics
- **Rich text editor**: Create and edit posts with TipTap editor
- **Image gallery**: Upload and manage photography examples
- **Admin panel**: Password-protected content management at `/admin`
- **Categories**: Digital, Film, and Optics categories
- **Search functionality**: Find articles by title and content

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express, PostgreSQL, Drizzle ORM
- **Deployment**: Cloudflare Pages + Workers
- **Authentication**: Simple password-based admin access

## Getting Started

1. Install dependencies: `npm install`
2. Set up database: `npm run db:push`
3. Seed with sample content: `tsx server/seed.ts`
4. Start development: `npm run dev`

## Admin Access

- **URL**: `/admin`
- **Password**: `B0ltzm@nnSchr0d1ng3r`

## Deployment

This project is configured for deployment to Cloudflare Pages with the following build settings:

- **Build command**: `npm run build`
- **Output directory**: `dist/public`
- **Node version**: 18+

## Author

A blog about the intersection of physics and photography.