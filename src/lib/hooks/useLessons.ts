"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { AsyncState, Lesson } from "@/lib/types/database";

export function useLessons(subjectId?: string | null) {
  const [state, setState] = useState<AsyncState<Lesson[]>>({
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
      let query = supabase.from("lessons").select("*").order("order_index");

      if (subjectId) {
        query = query.eq("subject_id", subjectId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setState({ data: data ?? [], isLoading: false, error: null });
    } catch (err) {
      setState({
        data: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الدروس",
      });
    }
  }, [subjectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
