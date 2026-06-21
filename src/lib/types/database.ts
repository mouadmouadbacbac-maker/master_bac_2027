export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  stream_id: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Stream {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Subject {
  id: string;
  stream_id: string;
  name: string;
  description: string | null;
  icon: string | null;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  subject_id: string;
  title: string;
  description: string | null;
  duration_minutes: number | null;
  video_url: string | null;
  order_index: number;
  is_completed: boolean;
  created_at: string;
}

export interface Quiz {
  id: string;
  subject_id: string;
  title: string;
  description: string | null;
  question_count: number;
  duration_minutes: number | null;
  best_score: number | null;
  is_completed: boolean;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  badge_color: string | null;
  points: number;
  unlocked_at: string | null;
  created_at: string;
}

export interface DashboardStats {
  lessons_completed: number;
  quizzes_completed: number;
  total_study_minutes: number;
  achievements_unlocked: number;
  current_streak_days: number;
  overall_progress: number;
}

export interface ActivityItem {
  id: string;
  type: "lesson" | "quiz" | "achievement";
  title: string;
  occurred_at: string;
}

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}
