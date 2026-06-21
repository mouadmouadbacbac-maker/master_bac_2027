-- BAC MASTER 2027 — Supabase schema reference
-- Run this in Supabase SQL editor when ready to connect the platform

create table if not exists streams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  color text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  stream_id uuid references streams(id),
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  stream_id uuid references streams(id) on delete cascade,
  name text not null,
  description text,
  icon text,
  order_index int default 0,
  created_at timestamptz default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references subjects(id) on delete cascade,
  title text not null,
  description text,
  duration_minutes int,
  video_url text,
  order_index int default 0,
  is_completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references subjects(id) on delete cascade,
  title text not null,
  description text,
  question_count int default 0,
  duration_minutes int,
  best_score int,
  is_completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  badge_color text,
  points int default 0,
  unlocked_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists dashboard_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lessons_completed int default 0,
  quizzes_completed int default 0,
  total_study_minutes int default 0,
  achievements_unlocked int default 0,
  current_streak_days int default 0,
  overall_progress int default 0
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text check (type in ('lesson', 'quiz', 'achievement')),
  title text not null,
  occurred_at timestamptz default now()
);
