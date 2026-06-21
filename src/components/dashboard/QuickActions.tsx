"use client";

import Link from "next/link";
import { GraduationCap, BookOpen, ClipboardList } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

const actions = [
  {
    href: "/streams",
    label: "اختر شعبتك",
    description: "حدد مسارك الدراسي",
    icon: GraduationCap,
    color: "from-neon-purple/20 to-neon-purple/5",
  },
  {
    href: "/subjects",
    label: "تصفح المواد",
    description: "استكشف موادك الدراسية",
    icon: BookOpen,
    color: "from-neon-blue/20 to-neon-blue/5",
  },
  {
    href: "/quizzes",
    label: "اختبر نفسك",
    description: "قيّم مستواك",
    icon: ClipboardList,
    color: "from-neon-cyan/20 to-neon-cyan/5",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={action.href}>
            <GlassCard hover className={`bg-gradient-to-br ${action.color}`}>
              <action.icon className="h-8 w-8 text-foreground mb-3" />
              <h3 className="font-semibold mb-1">{action.label}</h3>
              <p className="text-muted text-sm">{action.description}</p>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
