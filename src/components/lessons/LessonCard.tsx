"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Lesson } from "@/lib/types/database";

interface LessonCardProps {
  lesson: Lesson;
  index?: number;
  onClick?: (lesson: Lesson) => void;
}

export function LessonCard({ lesson, index = 0, onClick }: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <GlassCard hover onClick={() => onClick?.(lesson)}>
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
              lesson.is_completed
                ? "bg-green-500/10"
                : "bg-neon-purple/10"
            }`}
          >
            {lesson.is_completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            ) : (
              <PlayCircle className="h-6 w-6 text-neon-purple" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{lesson.title}</h3>
              {lesson.is_completed && (
                <Badge variant="cyan">مكتمل</Badge>
              )}
            </div>
            {lesson.description && (
              <p className="text-muted text-sm line-clamp-1">
                {lesson.description}
              </p>
            )}
          </div>
          {lesson.duration_minutes !== null && (
            <div className="flex items-center gap-1 text-muted text-sm shrink-0">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration_minutes} د</span>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
