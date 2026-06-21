"use client";

import {
  BookOpen,
  ClipboardList,
  Flame,
  Trophy,
  Clock,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatSkeleton } from "@/components/ui/Skeleton";
import type { DashboardStats } from "@/lib/types/database";

interface DashboardStatsGridProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

export function DashboardStatsGrid({
  stats,
  isLoading,
}: DashboardStatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        label="الدروس المكتملة"
        value={stats?.lessons_completed ?? null}
        icon={BookOpen}
        variant="purple"
      />
      <StatCard
        label="الاختبارات"
        value={stats?.quizzes_completed ?? null}
        icon={ClipboardList}
        variant="blue"
      />
      <StatCard
        label="ساعات الدراسة"
        value={
          stats?.total_study_minutes != null
            ? Math.floor(stats.total_study_minutes / 60)
            : null
        }
        suffix="س"
        icon={Clock}
        variant="cyan"
      />
      <StatCard
        label="الإنجازات"
        value={stats?.achievements_unlocked ?? null}
        icon={Trophy}
        variant="purple"
      />
      <StatCard
        label="سلسلة الأيام"
        value={stats?.current_streak_days ?? null}
        suffix="يوم"
        icon={Flame}
        variant="blue"
      />
      <StatCard
        label="التقدم العام"
        value={stats?.overall_progress ?? null}
        suffix="%"
        icon={TrendingUp}
        variant="cyan"
      />
    </div>
  );
}

interface DashboardProgressProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

export function DashboardProgress({
  stats,
  isLoading,
}: DashboardProgressProps) {
  if (isLoading) {
    return (
      <GlassCard className="space-y-4">
        <div className="h-5 w-32 rounded skeleton-shimmer" />
        <div className="h-2 w-full rounded-full skeleton-shimmer" />
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="purple">
      <ProgressBar
        value={stats?.overall_progress ?? null}
        label="التقدم نحو البكالوريا"
      />
    </GlassCard>
  );
}
