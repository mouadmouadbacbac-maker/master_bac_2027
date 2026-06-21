"use client";

import { motion } from "framer-motion";
import { Activity, BookOpen, ClipboardList, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemSkeleton } from "@/components/ui/Skeleton";
import type { ActivityItem } from "@/lib/types/database";

interface RecentActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

const typeIcons = {
  lesson: BookOpen,
  quiz: ClipboardList,
  achievement: Trophy,
};

const typeColors = {
  lesson: "text-neon-purple bg-neon-purple/10",
  quiz: "text-neon-blue bg-neon-blue/10",
  achievement: "text-neon-cyan bg-neon-cyan/10",
};

export function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <GlassCard>
        <h2 className="font-semibold mb-4">النشاط الأخير</h2>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListItemSkeleton key={i} />
          ))}
        </div>
      </GlassCard>
    );
  }

  if (activities.length === 0) {
    return (
      <GlassCard>
        <h2 className="font-semibold mb-4">النشاط الأخير</h2>
        <EmptyState
          icon={Activity}
          title="لا يوجد نشاط بعد"
          description="سيظهر هنا نشاطك الدراسي عند بدء التعلم"
          className="py-8"
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <h2 className="font-semibold mb-4">النشاط الأخير</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = typeIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${typeColors[activity.type]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.title}</p>
                <p className="text-muted text-xs">
                  {new Date(activity.occurred_at).toLocaleDateString("ar-MA", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
