"use client";

import { CardSkeleton } from "@/components/ui/Skeleton";
import { AchievementCard } from "./AchievementCard";
import type { Achievement } from "@/lib/types/database";

interface AchievementGridProps {
  achievements: Achievement[];
  isLoading?: boolean;
}

export function AchievementGrid({
  achievements,
  isLoading,
}: AchievementGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {achievements.map((achievement, index) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          index={index}
        />
      ))}
    </div>
  );
}
