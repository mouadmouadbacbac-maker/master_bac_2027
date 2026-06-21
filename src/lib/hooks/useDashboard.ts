"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type {
  ActivityItem,
  AsyncState,
  DashboardStats,
} from "@/lib/types/database";

const emptyStats: DashboardStats = {
  lessons_completed: 0,
  quizzes_completed: 0,
  total_study_minutes: 0,
  achievements_unlocked: 0,
  current_streak_days: 0,
  overall_progress: 0,
};

export function useDashboard() {
  const [state, setState] = useState<
    AsyncState<{ stats: DashboardStats; activities: ActivityItem[] }>
  >({ data: null, isLoading: true, error: null });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!isSupabaseConfigured()) {
      setState({
        data: { stats: emptyStats, activities: [] },
        isLoading: false,
        error: null,
      });
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setState({
        data: { stats: emptyStats, activities: [] },
        isLoading: false,
        error: null,
      });
      return;
    }

    try {
      const [statsResult, activitiesResult] = await Promise.all([
        supabase.from("dashboard_stats").select("*").maybeSingle(),
        supabase
          .from("activity_log")
          .select("*")
          .order("occurred_at", { ascending: false })
          .limit(10),
      ]);

      if (statsResult.error) throw statsResult.error;
      if (activitiesResult.error) throw activitiesResult.error;

      setState({
        data: {
          stats: statsResult.data ?? emptyStats,
          activities: activitiesResult.data ?? [],
        },
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: { stats: emptyStats, activities: [] },
        isLoading: false,
        error: err instanceof Error ? err.message : "حدث خطأ أثناء تحميل البيانات",
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
