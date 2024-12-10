import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

export const SectionHeader = React.memo(function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg",
        "bg-[rgb(var(--color-primary)/0.1)]",
        "ring-1 ring-[rgb(var(--color-primary)/0.2)]",
        "transition-all duration-300 hover:shadow-md"
      )}>
        <Icon className="h-5 w-5 text-[rgb(var(--color-primary))]" />
        <h2 className="text-lg font-semibold text-[rgb(var(--color-primary))]">{title}</h2>
      </div>
    </div>
  );
});