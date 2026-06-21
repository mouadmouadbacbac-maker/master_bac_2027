import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "purple" | "blue";
  hover?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  default: "glass",
  strong: "glass-strong",
  purple: "glass neon-border-purple",
  blue: "glass neon-border-blue",
};

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = false,
  onClick,
}: GlassCardProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "rounded-2xl p-5 transition-all duration-300",
        variantStyles[variant],
        hover && "hover:bg-white/[0.06] hover:scale-[1.01] cursor-pointer",
        onClick && "text-right w-full",
        className,
      )}
    >
      {children}
    </Component>
  );
}
