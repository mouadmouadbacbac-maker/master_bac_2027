"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { NeonButton } from "@/components/ui/NeonButton";
import { StreamGrid } from "@/components/streams/StreamGrid";
import { useStreams } from "@/lib/hooks/useStreams";
import type { Stream } from "@/lib/types/database";

export default function StreamsPage() {
  const { data: streams, isLoading, error, refetch } = useStreams();
  const [selected, setSelected] = useState<Stream | null>(null);

  const handleSelect = (stream: Stream) => {
    setSelected(stream);
    // Future: persist selection via Supabase profiles table
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="اختيار الشعب"
        description="اختر الشعبة التي تدرس فيها للحصول على محتوى مخصص"
        action={
          selected && (
            <NeonButton variant="blue" disabled>
              حفظ الاختيار
            </NeonButton>
          )
        }
      />

      {error && <ErrorState message={error} onRetry={refetch} />}

      <StreamGrid
        streams={streams ?? []}
        selectedId={selected?.id}
        onSelect={handleSelect}
        isLoading={isLoading}
      />

      {!isLoading && !error && streams?.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          title="لا توجد شعب متاحة"
          description="ستظهر الشعب الدراسية هنا عند إضافتها من قاعدة البيانات"
        />
      )}
    </div>
  );
}
