"use client";

import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AchievementGrid } from "@/components/achievements/AchievementGrid";
import { useAchievements } from "@/lib/hooks/useAchievements";

export default function AchievementsPage() {
  const { data: achievements, isLoading, error, refetch } = useAchievements();

  const unlockedCount =
    achievements?.filter((a) => a.unlocked_at).length ?? 0;
  const totalCount = achievements?.length ?? 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="الإنجازات"
        description={
          !isLoading && totalCount > 0
            ? `تم فتح ${unlockedCount} من ${totalCount} إنجاز`
            : "اكسب شارات ونقاط أثناء تقدمك"
        }
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <AchievementGrid
        achievements={achievements ?? []}
        isLoading={isLoading}
      />

      {!isLoading && !error && achievements?.length === 0 && (
        <EmptyState
          icon={Trophy}
          title="لا توجد إنجازات"
          description="ستظهر الإنجازات والشارات هنا عند إعدادها في النظام"
        />
      )}
    </div>
  );
}
