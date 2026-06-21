"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Achievement, AsyncState } from "@/lib/types/database";

export function useAchievements() {
  const [state, setState] = useState<AsyncState<Achievement[]>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!isSupabaseConfigured()) {
      setState({ data: [], isLoading: false, error: null });
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setState({ data: [], isLoading: false, error: null });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setState({ data: data ?? [], isLoading: false, error: null });
    } catch (err) {
      setState({
        data: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الإنجازات",
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
