"use client";

import { ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { QuizList } from "@/components/quizzes/QuizList";
import { useQuizzes } from "@/lib/hooks/useQuizzes";
import type { Quiz } from "@/lib/types/database";

export default function QuizzesPage() {
  const { data: quizzes, isLoading, error, refetch } = useQuizzes();

  const handleQuizClick = (_quiz: Quiz) => {
    // Future: navigate to quiz interface
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader
        title="الاختبارات"
        description="اختبر معلوماتك وتتبع نتائجك"
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <QuizList
        quizzes={quizzes ?? []}
        isLoading={isLoading}
        onQuizClick={handleQuizClick}
      />

      {!isLoading && !error && quizzes?.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="لا توجد اختبارات"
          description="ستظهر الاختبارات هنا عند إضافتها من قاعدة البيانات"
        />
      )}
    </div>
  );
}
