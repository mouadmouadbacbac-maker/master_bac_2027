"use client";

import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { SubjectGrid } from "@/components/subjects/SubjectGrid";
import { useSubjects } from "@/lib/hooks/useSubjects";

export default function SubjectsPage() {
  const { data: subjects, isLoading, error, refetch } = useSubjects();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="المواد الدراسية"
        description="جميع المواد المتاحة في شعبتك"
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <SubjectGrid subjects={subjects ?? []} isLoading={isLoading} />

      {!isLoading && !error && subjects?.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="لا توجد مواد بعد"
          description="ستظهر المواد الدراسية هنا بعد اختيار شعبتك وإضافة المحتوى"
        />
      )}
    </div>
  );
}
