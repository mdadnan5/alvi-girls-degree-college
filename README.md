# Alvi Girls Degree College — Full Stack Website

A modern, production-ready college website with admin panel built with Next.js 16, MongoDB, and NextAuth.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** — fully type-safe
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — smooth animations
- **MongoDB + Mongoose** — database
- **NextAuth v5 (beta)** — JWT authentication
- **React Hook Form + Zod** — form validation
- **Lucide React** — icons
- **Sonner** — toast notifications

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public website pages
│   ├── admin/
│   │   ├── (auth)/login   # Admin login
│   │   └── (panel)/       # Protected admin pages
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── public/            # Navbar, Footer
│   └── admin/             # Sidebar, Table
├── sections/              # Home page sections
├── models/                # Mongoose models
├── lib/                   # DB, Auth utilities
├── types/                 # TypeScript interfaces
├── validations/           # Zod schemas
└── proxy.ts               # Route protection
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` (already created):

```env
MONGODB_URI=mongodb://localhost:27017/alvi_gdc
NEXTAUTH_SECRET=your-super-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running locally, or update `MONGODB_URI` with your MongoDB Atlas connection string.

### 4. Seed the admin account

Start the dev server and visit:

```
http://localhost:3000/api/seed
```

This creates the default admin account.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

### Public Website
| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/about` | About the college |
| `/courses` | Academic programs |
| `/faculty` | Faculty members |
| `/events` | Upcoming events |
| `/notices` | Notice board |
| `/gallery` | Photo gallery |
| `/admissions` | Apply online |
| `/contact` | Contact form |

### Admin Panel
| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login |
| `/admin/dashboard` | Overview stats |
| `/admin/notices` | Manage notices |
| `/admin/events` | Manage events |
| `/admin/faculty` | Manage faculty |
| `/admin/courses` | Manage courses |
| `/admin/gallery` | Manage gallery |
| `/admin/admissions` | View applications |


> **Important:** Change these in `.env.local` before deploying to production.

## Build for Production

```bash
npm run build
npm start
```
