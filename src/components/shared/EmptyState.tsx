import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      "rounded-lg border border-dashed border-[rgb(var(--color-border))]",
      className
    )}>
      <Icon className="h-12 w-12 text-[rgb(var(--color-text-secondary))]" />
      <h3 className="mt-4 text-lg font-medium text-[rgb(var(--color-text-primary))]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
        {description}
      </p>
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-6"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}