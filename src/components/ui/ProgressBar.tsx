"use client";

import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number | null;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  className,
}: ProgressBarProps) {
  const safeValue = value ?? 0;
  const clamped = Math.min(100, Math.max(0, safeValue));

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted">{label}</span>}
          {showPercentage && (
            <span className="text-neon-purple font-medium">
              {value === null ? "—" : `${clamped}%`}
            </span>
          )}
        </div>
      )}
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-l from-neon-purple to-neon-blue transition-all duration-700 ease-out shadow-[0_0_12px_rgba(168,85,247,0.5)]"
          style={{ width: value === null ? "0%" : `${clamped}%` }}
        />
      </div>
    </div>
  );
}
