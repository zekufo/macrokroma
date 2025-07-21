# macrokroma Blog

## Overview

This is a full-stack blog application focused on the physics and technical aspects of photography. It features a modern React frontend with TypeScript and a Node.js/Express backend. The application allows users to read articles about photography physics, browse an image gallery, and create new posts with a rich text editor.

## User Preferences

Preferred communication style: Simple, everyday language.
Directive: Wait for all information before acting on requests.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Rich Text Editing**: TipTap editor for creating and editing blog posts
- **Form Handling**: React Hook Form with Zod validation for type-safe forms

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for hot reloading during development
- **Production Build**: esbuild for efficient bundling

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Provider**: Configured for Neon Database (@neondatabase/serverless)
- **Schema**: Shared TypeScript schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database migrations and schema management

### File Storage
- **Images**: Local file storage using multer for image uploads
- **Upload Directory**: `/uploads` with file size limits and type validation
- **Supported Formats**: JPEG, PNG, GIF, WebP images up to 5MB

## Key Components

### Database Schema
- **Posts Table**: Contains blog posts with title, content, excerpt, category, cover image, publication status, and read time
- **Images Table**: Stores uploaded images with metadata and optional post associations
- **Categories**: Digital, Film, Optics, and Technique photography categories

### API Routes
- **GET /api/posts**: Retrieve posts with optional category and search filtering
- **GET /api/posts/:id**: Get individual post details
- **POST /api/posts**: Create new blog posts
- **POST /api/images**: Upload images with automatic file handling
- **GET /uploads/***: Serve uploaded images with CORS headers

### Frontend Pages
- **Home**: Main landing page with hero section, post listings, and category filters
- **Post Details**: Individual post view with rich content display
- **Create Post**: Rich text editor for creating new articles (admin access only)
- **Gallery**: Image gallery with grid/list view options
- **About**: Information page about the blog
- **Admin Panel**: Password-protected admin interface at `/admin` for content management
- **404**: Custom not found page

### UI Components
- **Header**: Navigation with search functionality and mobile menu
- **Post Cards**: Responsive post previews with category badges and metadata
- **Rich Text Editor**: TipTap-based editor with formatting controls
- **Image Gallery**: Responsive image grid with modal previews
- **Search Bar**: Real-time search with URL parameter handling

## Data Flow

1. **Post Creation**: Users create posts through the rich text editor, which saves content as HTML to the database
2. **Image Upload**: Images are uploaded to the server filesystem and metadata is stored in the database
3. **Content Retrieval**: Posts are fetched with optional filtering by category or search terms
4. **Client-Side Routing**: Wouter handles navigation without page reloads
5. **State Management**: React Query manages server state with caching and automatic refetching

## Security and Access Control

### Admin Authentication
- **Admin Panel**: Hidden interface at `/admin` for content management
- **Password Protection**: Simple password authentication (default: `B0ltzm@nnSchr0d1ng3r`)
- **Features**: Create posts, manage images, view site statistics
- **Public Interface**: New Post button removed from main navigation for security

### Cloudflare Deployment
- **Domain**: macrokroma.com 
- **Architecture**: Pages (frontend) + Workers (API) + D1 Database + R2 Storage
- **Configuration**: Complete wrangler.toml and deployment scripts ready
- **Documentation**: Comprehensive deployment guide in CLOUDFLARE_DEPLOYMENT.md

## External Dependencies

### Core Framework Dependencies
- React 18 with TypeScript support
- Express.js for backend API
- PostgreSQL with Drizzle ORM

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible components
- Lucide React for consistent iconography

### Development Tools
- Vite for fast development builds
- ESBuild for production bundling
- tsx for TypeScript execution

### Database and Storage
- Neon Database for PostgreSQL hosting
- Multer for multipart file upload handling
- connect-pg-simple for session storage

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend development
- tsx with nodemon-like functionality for backend hot reloading
- Replit-specific plugins for development environment integration

### Production Build
- Frontend: Vite builds static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations applied via `db:push` command

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- File uploads stored in local `uploads` directory
- Static asset serving for uploaded images

### Hosting Considerations
- Designed for platforms supporting Node.js and PostgreSQL
- File upload directory needs write permissions
- Environment variables required for database connectivity