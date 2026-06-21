"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Subject } from "@/lib/types/database";

interface SubjectCardProps {
  subject: Subject;
  index?: number;
}

export function SubjectCard({ subject, index = 0 }: SubjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/lessons?subject=${subject.id}`}>
        <GlassCard hover variant="blue" className="h-full">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-blue/10 shrink-0">
              <BookOpen className="h-6 w-6 text-neon-blue" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {subject.name}
              </h3>
              {subject.description && (
                <p className="text-muted text-sm mt-1 line-clamp-2">
                  {subject.description}
                </p>
              )}
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
