"use client";

import { ListItemSkeleton } from "@/components/ui/Skeleton";
import { LessonCard } from "./LessonCard";
import type { Lesson } from "@/lib/types/database";

interface LessonListProps {
  lessons: Lesson[];
  isLoading?: boolean;
  onLessonClick?: (lesson: Lesson) => void;
}

export function LessonList({
  lessons,
  isLoading,
  onLessonClick,
}: LessonListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          index={index}
          onClick={onLessonClick}
        />
      ))}
    </div>
  );
}
