# Bookmark Manager

A generic, real-time bookmark manager application built to demonstrate modern web development practices.

## Overview

This application allows users to store and manage their personal bookmarks. It features:
- **Google Authentication**: Secure login integrated with Supabase Auth.
- **Private Storage**: Bookmarks are protected by Row Level Security (RLS), ensuring users only see their own data.
- **Real-time Updates**: The bookmark list updates instantly across all devices and tabs when changes occur.
- **Responsive Design**: A clean, modern UI styled with Tailwind CSS that supports dark mode.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

## Getting Started

### 1. Prerequisites

- Node.js installed on your machine.
- A Supabase project with a configured database and Google Authentication enabled.

### 2. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Installation & Running

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

For the application to function correctly, your Supabase database should have a `bookmarks` table with the following schema:

```sql
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.bookmarks enable row level security;

-- Policy: Users see only their own bookmarks
create policy "Users can fully manage their own bookmarks"
on public.bookmarks for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Enable Realtime
alter publication supabase_realtime add table bookmarks;
```
