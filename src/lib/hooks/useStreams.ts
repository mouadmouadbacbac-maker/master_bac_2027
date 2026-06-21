"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { AsyncState, Stream } from "@/lib/types/database";

export function useStreams() {
  const [state, setState] = useState<AsyncState<Stream[]>>({
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
        .from("streams")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setState({ data: data ?? [], isLoading: false, error: null });
    } catch (err) {
      setState({
        data: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الشعب",
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
