"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ProfileSkeleton } from "@/components/ui/Skeleton";
import type { Profile } from "@/lib/types/database";

interface ProfileHeaderProps {
  profile: Profile | null;
  isLoading?: boolean;
}

export function ProfileHeader({ profile, isLoading }: ProfileHeaderProps) {
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center"
    >
      <Avatar
        src={profile?.avatar_url}
        alt={profile?.full_name ?? undefined}
        size="xl"
        className="mb-4"
      />
      <h2 className="text-xl font-bold">
        {profile?.full_name ?? "—"}
      </h2>
      {profile?.bio && (
        <p className="text-muted text-sm mt-2 max-w-md">{profile.bio}</p>
      )}
      {profile?.stream_id && (
        <Badge variant="purple" className="mt-3">
          شعبة مسجّلة
        </Badge>
      )}
    </motion.div>
  );
}
