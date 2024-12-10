import React from 'react';
import { cn } from '@/lib/utils';
import type { StatsCardConfig } from '@/types/stats';

interface StatsCardProps extends StatsCardConfig {
  loading?: boolean;
}

const variants = {
  projects: {
    gradient: 'from-[rgb(var(--color-primary)/0.1)] to-[rgb(var(--color-primary)/0.05)]',
    iconBg: 'bg-[rgb(var(--color-primary)/0.1)]',
    iconColor: 'text-[rgb(var(--color-primary))]',
    textColor: 'text-[rgb(var(--color-primary))]',
    borderColor: 'border-[rgb(var(--color-primary)/0.2)]',
    hoverBg: 'hover:bg-[rgb(var(--color-primary)/0.1)]'
  },
  content: {
    gradient: 'from-[rgb(var(--color-success)/0.1)] to-[rgb(var(--color-success)/0.05)]',
    iconBg: 'bg-[rgb(var(--color-success)/0.1)]',
    iconColor: 'text-[rgb(var(--color-success))]',
    textColor: 'text-[rgb(var(--color-success))]',
    borderColor: 'border-[rgb(var(--color-success)/0.2)]',
    hoverBg: 'hover:bg-[rgb(var(--color-success)/0.1)]'
  },
  profiles: {
    gradient: 'from-[rgb(var(--color-accent)/0.1)] to-[rgb(var(--color-accent)/0.05)]',
    iconBg: 'bg-[rgb(var(--color-accent)/0.1)]',
    iconColor: 'text-[rgb(var(--color-accent))]',
    textColor: 'text-[rgb(var(--color-accent))]',
    borderColor: 'border-[rgb(var(--color-accent)/0.2)]',
    hoverBg: 'hover:bg-[rgb(var(--color-accent)/0.1)]'
  },
  satisfaction: {
    gradient: 'from-[rgb(var(--color-secondary)/0.1)] to-[rgb(var(--color-secondary)/0.05)]',
    iconBg: 'bg-[rgb(var(--color-secondary)/0.1)]',
    iconColor: 'text-[rgb(var(--color-secondary))]',
    textColor: 'text-[rgb(var(--color-secondary))]',
    borderColor: 'border-[rgb(var(--color-secondary)/0.2)]',
    hoverBg: 'hover:bg-[rgb(var(--color-secondary)/0.1)]'
  }
};

export const StatsCard = React.memo(function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  variant,
  loading 
}: StatsCardProps) {
  const styles = variants[variant];

  if (loading) {
    return (
      <div className={cn(
        'relative overflow-hidden rounded-xl p-6',
        'bg-gradient-to-br border transition-all duration-300',
        'animate-pulse',
        styles.gradient,
        styles.borderColor
      )}>
        <div className="h-20" />
      </div>
    );
  }

  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl p-6',
      'bg-gradient-to-br border transition-all duration-300',
      'hover:shadow-lg hover:scale-[1.02]',
      styles.gradient,
      styles.borderColor,
      styles.hoverBg
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          'rounded-xl p-3',
          'transition-transform duration-300 group-hover:scale-110',
          styles.iconBg,
          styles.iconColor
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <p className={cn(
            'text-sm font-medium',
            styles.textColor
          )}>
            {title}
          </p>
          <p className={cn(
            'text-2xl font-bold tracking-tight',
            styles.textColor
          )}>
            {value}
          </p>
          <p className={cn(
            'text-xs font-medium',
            styles.textColor,
            'opacity-80'
          )}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});