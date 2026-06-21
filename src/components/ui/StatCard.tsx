"use client";

import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string | null;
  icon: LucideIcon;
  suffix?: string;
  variant?: "purple" | "blue" | "cyan";
  isLoading?: boolean;
}

const iconVariants = {
  purple: "text-neon-purple bg-neon-purple/10",
  blue: "text-neon-blue bg-neon-blue/10",
  cyan: "text-neon-cyan bg-neon-cyan/10",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  suffix,
  variant = "purple",
  isLoading,
}: StatCardProps) {
  const displayValue =
    value === null || value === undefined ? "—" : value;

  return (
    <div className="glass rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05]">
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl mb-4",
          iconVariants[variant],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      {isLoading ? (
        <div className="h-8 w-16 rounded-lg skeleton-shimmer mb-1" />
      ) : (
        <p className="text-2xl font-bold text-foreground">
          {displayValue}
          {suffix && value !== null && (
            <span className="text-sm font-normal text-muted mr-1">{suffix}</span>
          )}
        </p>
      )}
      <p className="text-muted text-sm mt-1">{label}</p>
    </div>
  );
}
