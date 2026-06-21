"use client";

import { AlertCircle } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <GlassCard variant="purple" className="text-center py-10">
      <AlertCircle className="h-10 w-10 text-neon-purple mx-auto mb-4" />
      <p className="text-foreground font-medium mb-2">حدث خطأ</p>
      <p className="text-muted text-sm mb-6">{message}</p>
      {onRetry && (
        <NeonButton variant="ghost" onClick={onRetry}>
          إعادة المحاولة
        </NeonButton>
      )}
    </GlassCard>
  );
}
