"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { AsyncState, Subject } from "@/lib/types/database";

export function useSubjects(streamId?: string | null) {
  const [state, setState] = useState<AsyncState<Subject[]>>({
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
      let query = supabase.from("subjects").select("*").order("order_index");

      if (streamId) {
        query = query.eq("stream_id", streamId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setState({ data: data ?? [], isLoading: false, error: null });
    } catch (err) {
      setState({
        data: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "حدث خطأ أثناء تحميل المواد",
      });
    }
  }, [streamId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
