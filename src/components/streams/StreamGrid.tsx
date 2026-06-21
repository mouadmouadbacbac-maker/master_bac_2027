"use client";

import { CardSkeleton } from "@/components/ui/Skeleton";
import { StreamCard } from "./StreamCard";
import type { Stream } from "@/lib/types/database";

interface StreamGridProps {
  streams: Stream[];
  selectedId?: string | null;
  onSelect?: (stream: Stream) => void;
  isLoading?: boolean;
}

export function StreamGrid({
  streams,
  selectedId,
  onSelect,
  isLoading,
}: StreamGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {streams.map((stream, index) => (
        <StreamCard
          key={stream.id}
          stream={stream}
          isSelected={stream.id === selectedId}
          onSelect={onSelect}
          index={index}
        />
      ))}
    </div>
  );
}
