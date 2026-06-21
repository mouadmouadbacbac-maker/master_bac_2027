"use client";

import { User } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { useProfile } from "@/lib/hooks/useProfile";

export default function ProfilePage() {
  const { data: profile, isLoading, error, refetch } = useProfile();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <PageHeader
        title="الملف الشخصي"
        description="معلومات حسابك وإعداداتك الشخصية"
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <GlassCard variant="purple" className="py-8">
        <ProfileHeader profile={profile} isLoading={isLoading} />
      </GlassCard>

      {!isLoading && !error && !profile && (
        <EmptyState
          icon={User}
          title="لم يتم تسجيل الدخول"
          description="سجّل الدخول لعرض ملفك الشخصي وإدارة حسابك"
        />
      )}
    </div>
  );
}
