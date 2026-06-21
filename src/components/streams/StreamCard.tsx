"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Stream } from "@/lib/types/database";

interface StreamCardProps {
  stream: Stream;
  isSelected?: boolean;
  onSelect?: (stream: Stream) => void;
  index?: number;
}

export function StreamCard({
  stream,
  isSelected,
  onSelect,
  index = 0,
}: StreamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard
        variant={isSelected ? "purple" : "default"}
        hover
        onClick={() => onSelect?.(stream)}
        className={isSelected ? "ring-2 ring-neon-purple/50" : ""}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
            style={{
              backgroundColor: stream.color
                ? `${stream.color}20`
                : "rgba(168, 85, 247, 0.1)",
            }}
          >
            <GraduationCap
              className="h-6 w-6"
              style={{ color: stream.color ?? "#a855f7" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {stream.name}
              </h3>
              {isSelected && <Badge variant="purple">مختارة</Badge>}
            </div>
            {stream.description && (
              <p className="text-muted text-sm line-clamp-2">
                {stream.description}
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
