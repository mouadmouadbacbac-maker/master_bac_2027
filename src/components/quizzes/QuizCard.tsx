"use client";

import { motion } from "framer-motion";
import { ClipboardList, Clock, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Quiz } from "@/lib/types/database";

interface QuizCardProps {
  quiz: Quiz;
  index?: number;
  onClick?: (quiz: Quiz) => void;
}

export function QuizCard({ quiz, index = 0, onClick }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard hover variant="blue" onClick={() => onClick?.(quiz)}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-blue/10 shrink-0">
            <ClipboardList className="h-6 w-6 text-neon-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold">{quiz.title}</h3>
              {quiz.is_completed && <Badge variant="blue">مكتمل</Badge>}
            </div>
            {quiz.description && (
              <p className="text-muted text-sm line-clamp-2 mb-3">
                {quiz.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted">
              <span>{quiz.question_count} سؤال</span>
              {quiz.duration_minutes !== null && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {quiz.duration_minutes} د
                </span>
              )}
              {quiz.best_score !== null && (
                <span className="flex items-center gap-1 text-neon-purple">
                  <Star className="h-3.5 w-3.5" />
                  {quiz.best_score}%
                </span>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
