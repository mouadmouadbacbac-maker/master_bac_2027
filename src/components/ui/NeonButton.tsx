"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "purple" | "blue" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

const variants = {
  purple:
    "bg-gradient-to-l from-neon-purple/80 to-neon-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]",
  blue: "bg-gradient-to-l from-neon-blue/80 to-neon-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
  ghost:
    "glass text-foreground hover:bg-white/[0.08] border border-white/10",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

export function NeonButton({
  children,
  onClick,
  variant = "purple",
  size = "md",
  icon: Icon,
  disabled,
  type = "button",
  className,
}: NeonButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {Icon && <Icon className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />}
      {children}
    </motion.button>
  );
}
