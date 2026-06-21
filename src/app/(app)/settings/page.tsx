"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { NeonButton } from "@/components/ui/NeonButton";
import {
  SettingsSection,
  SettingsField,
  SettingsInput,
  SettingsToggle,
} from "@/components/settings/SettingsSection";
import { useProfile } from "@/lib/hooks/useProfile";

export default function SettingsPage() {
  const { data: profile, isLoading } = useProfile();
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="الإعدادات"
        description="إدارة تفضيلات حسابك والتطبيق"
        action={
          <NeonButton variant="purple" disabled>
            حفظ التغييرات
          </NeonButton>
        }
      />

      <SettingsSection
        title="المعلومات الشخصية"
        description="بيانات حسابك الأساسية"
      >
        <SettingsField label="الاسم الكامل">
          <SettingsInput
            value={profile?.full_name ?? undefined}
            placeholder="—"
            disabled={isLoading}
          />
        </SettingsField>
        <SettingsField label="نبذة">
          <SettingsInput
            value={profile?.bio ?? undefined}
            placeholder="—"
            disabled={isLoading}
          />
        </SettingsField>
      </SettingsSection>

      <SettingsSection
        title="التفضيلات"
        description="تخصيص تجربة التعلم"
      >
        <SettingsField label="الإشعارات">
          <SettingsToggle
            enabled={notifications}
            onChange={setNotifications}
            disabled
          />
        </SettingsField>
        <SettingsField label="الوضع الداكن">
          <SettingsToggle
            enabled={darkMode}
            onChange={setDarkMode}
            disabled
          />
        </SettingsField>
      </SettingsSection>

      <SettingsSection
        title="الحساب"
        description="إدارة حسابك وأمانك"
      >
        <SettingsField label="البريد الإلكتروني">
          <SettingsInput placeholder="—" disabled />
        </SettingsField>
        <SettingsField label="كلمة المرور">
          <SettingsInput type="password" placeholder="••••••••" disabled />
        </SettingsField>
      </SettingsSection>
    </div>
  );
}
