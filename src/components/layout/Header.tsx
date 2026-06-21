"use client";

import { Menu, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { NeonButton } from "@/components/ui/NeonButton";
import { useProfile } from "@/lib/hooks/useProfile";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: profile, isLoading } = useProfile();

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-white/5 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <NeonButton
            variant="ghost"
            size="sm"
            icon={Menu}
            onClick={onMenuClick}
            className="lg:hidden !p-2"
          >
            <span className="sr-only">القائمة</span>
          </NeonButton>
          <div className="hidden sm:block">
            <p className="text-xs text-muted">مرحباً بك</p>
            <p className="font-semibold text-sm">
              {isLoading ? (
                <span className="inline-block h-4 w-24 rounded skeleton-shimmer" />
              ) : profile?.full_name ? (
                profile.full_name
              ) : (
                "—"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative p-2 rounded-xl glass hover:bg-white/[0.06] transition-colors"
            aria-label="الإشعارات"
          >
            <Bell className="h-5 w-5 text-muted" />
          </button>
          <Avatar
            src={profile?.avatar_url}
            alt={profile?.full_name ?? undefined}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}
