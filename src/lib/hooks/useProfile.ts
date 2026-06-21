"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { AsyncState, Profile } from "@/lib/types/database";

export function useProfile() {
  const [state, setState] = useState<AsyncState<Profile | null>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!isSupabaseConfigured()) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setState({ data: null, isLoading: false, error: null });
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      setState({ data: data ?? null, isLoading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الملف الشخصي",
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
