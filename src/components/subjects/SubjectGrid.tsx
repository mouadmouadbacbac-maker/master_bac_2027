"use client";

import { CardSkeleton } from "@/components/ui/Skeleton";
import { SubjectCard } from "./SubjectCard";
import type { Subject } from "@/lib/types/database";

interface SubjectGridProps {
  subjects: Subject[];
  isLoading?: boolean;
}

export function SubjectGrid({ subjects, isLoading }: SubjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjects.map((subject, index) => (
        <SubjectCard key={subject.id} subject={subject} index={index} />
      ))}
    </div>
  );
}
