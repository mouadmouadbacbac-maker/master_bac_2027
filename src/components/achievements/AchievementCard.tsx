"use client";

import { motion } from "framer-motion";
import { Lock, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Achievement } from "@/lib/types/database";

interface AchievementCardProps {
  achievement: Achievement;
  index?: number;
}

export function AchievementCard({ achievement, index = 0 }: AchievementCardProps) {
  const isUnlocked = Boolean(achievement.unlocked_at);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
    >
      <GlassCard
        variant={isUnlocked ? "purple" : "default"}
        className={!isUnlocked ? "opacity-60" : ""}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
            style={{
              backgroundColor: isUnlocked
                ? achievement.badge_color
                  ? `${achievement.badge_color}25`
                  : "rgba(168, 85, 247, 0.15)"
                : "rgba(255,255,255,0.05)",
            }}
          >
            {isUnlocked ? (
              <Trophy
                className="h-8 w-8"
                style={{ color: achievement.badge_color ?? "#a855f7" }}
              />
            ) : (
              <Lock className="h-7 w-7 text-muted" />
            )}
            {isUnlocked && (
              <div className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-neon-purple pulse-glow" />
            )}
          </div>
          <h3 className="font-semibold mb-1">{achievement.title}</h3>
          {achievement.description && (
            <p className="text-muted text-sm mb-3 line-clamp-2">
              {achievement.description}
            </p>
          )}
          <Badge variant={isUnlocked ? "purple" : "muted"}>
            {isUnlocked ? `${achievement.points} نقطة` : "مقفل"}
          </Badge>
        </div>
      </GlassCard>
    </motion.div>
  );
}
