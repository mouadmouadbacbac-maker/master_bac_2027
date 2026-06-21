"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  PlayCircle,
  Settings,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { APP_NAME, NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  PlayCircle,
  ClipboardList,
  Trophy,
  User,
  Settings,
};

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col glass-strong border-l border-white/5">
      <div className="p-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 group" onClick={onNavigate}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight group-hover:text-neon-purple transition-colors">
              {APP_NAME}
            </p>
            <p className="text-[10px] text-muted">2027</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-white"
                  : "text-muted hover:text-foreground hover:bg-white/[0.04]",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-l from-neon-purple/20 to-neon-blue/10 border border-neon-purple/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon
                className={cn(
                  "relative h-5 w-5 shrink-0",
                  isActive ? "text-neon-purple" : "",
                )}
              />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="rounded-xl p-4 bg-gradient-to-br from-neon-purple/10 to-neon-blue/5 border border-neon-purple/20">
          <p className="text-xs text-muted leading-relaxed">
            استعد للبكالوريا 2027 بأسلوب مستقبلي
          </p>
        </div>
      </div>
    </aside>
  );
}
