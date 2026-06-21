"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LessonList } from "@/components/lessons/LessonList";
import { useLessons } from "@/lib/hooks/useLessons";
import type { Lesson } from "@/lib/types/database";

function LessonsContent() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const { data: lessons, isLoading, error, refetch } = useLessons(subjectId);

  const handleLessonClick = (_lesson: Lesson) => {
    // Future: navigate to lesson player
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="الدروس"
        description={
          subjectId
            ? "دروس المادة المحددة"
            : "جميع الدروس المتاحة"
        }
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <LessonList
        lessons={lessons ?? []}
        isLoading={isLoading}
        onLessonClick={handleLessonClick}
      />

      {!isLoading && !error && lessons?.length === 0 && (
        <EmptyState
          icon={PlayCircle}
          title="لا توجد دروس"
          description="ستظهر الدروس هنا عند إضافتها إلى قاعدة البيانات"
        />
      )}
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense>
      <LessonsContent />
    </Suspense>
  );
}
