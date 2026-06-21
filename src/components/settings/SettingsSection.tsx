"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <GlassCard className={cn("space-y-4", className)}>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-muted text-sm mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </GlassCard>
  );
}

interface SettingsFieldProps {
  label: string;
  children: ReactNode;
}

export function SettingsField({ label, children }: SettingsFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-white/5 last:border-0">
      <label className="text-sm text-muted">{label}</label>
      <div className="sm:w-1/2">{children}</div>
    </div>
  );
}

interface SettingsInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  type?: string;
}

export function SettingsInput({
  value,
  placeholder,
  disabled = true,
  onChange,
  type = "text",
}: SettingsInputProps) {
  return (
    <input
      type={type}
      value={value ?? ""}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full rounded-xl glass px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-neon-purple/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      dir="rtl"
    />
  );
}

interface SettingsToggleProps {
  enabled: boolean;
  onChange?: (enabled: boolean) => void;
  disabled?: boolean;
}

export function SettingsToggle({
  enabled,
  onChange,
  disabled = true,
}: SettingsToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => onChange?.(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        enabled ? "bg-neon-purple" : "bg-white/10",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          enabled ? "-translate-x-6" : "-translate-x-1",
        )}
      />
    </button>
  );
}
