# Bookmark Manager

A simple, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Google Authentication**: secure sign-in via Google OAuth.
- **Real-time Updates**: changes reflect instantly across devices/tabs without refresh.
- **Private Bookmarks**: users can only see and manage their own bookmarks.
- **Clean UI**: styled with Tailwind CSS and dark mode support.

## Getting Started

### 1. Supabase Setup

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create your project and database schema.

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment on Vercel

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into [Vercel](https://vercel.com/new).
3.  Add the Environment Variables in Vercel Project Settings:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  Deploy!
5.  **Important**: detailed in `SUPABASE_SETUP.md`, ensure you add your production URL (e.g., `https://your-app.vercel.app/auth/callback`) to your Google Cloud Console Authorized Redirect URIs.
