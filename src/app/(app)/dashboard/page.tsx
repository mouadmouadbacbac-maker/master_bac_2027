"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { ErrorState } from "@/components/ui/ErrorState";
import {
  DashboardStatsGrid,
  DashboardProgress,
} from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useDashboard } from "@/lib/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="لوحة التحكم"
        description="تابع تقدمك الدراسي نحو البكالوريا 2027"
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <DashboardStatsGrid stats={data?.stats ?? null} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardProgress
            stats={data?.stats ?? null}
            isLoading={isLoading}
          />
          <QuickActions />
        </div>
        <div>
          <RecentActivity
            activities={data?.activities ?? []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
