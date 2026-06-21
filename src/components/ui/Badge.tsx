"use client";

import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "blue" | "cyan" | "muted";
  className?: string;
}

const variants = {
  purple: "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
  blue: "bg-neon-blue/15 text-neon-blue border-neon-blue/30",
  cyan: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
  muted: "bg-white/5 text-muted border-white/10",
};

export function Badge({ children, variant = "purple", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
