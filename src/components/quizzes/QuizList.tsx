"use client";

import { CardSkeleton } from "@/components/ui/Skeleton";
import { QuizCard } from "./QuizCard";
import type { Quiz } from "@/lib/types/database";

interface QuizListProps {
  quizzes: Quiz[];
  isLoading?: boolean;
  onQuizClick?: (quiz: Quiz) => void;
}

export function QuizList({ quizzes, isLoading, onQuizClick }: QuizListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          index={index}
          onClick={onQuizClick}
        />
      ))}
    </div>
  );
}
