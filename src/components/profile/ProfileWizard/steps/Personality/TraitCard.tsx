import React from 'react';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { PERSONALITY_TRAITS } from '@/constants/personalityTraits';

interface TraitCardProps {
  trait: keyof typeof PERSONALITY_TRAITS;
  selected: boolean;
  recommended: boolean;
  onClick: () => void;
}

export function TraitCard({ trait, selected, recommended, onClick }: TraitCardProps) {
  const traitInfo = PERSONALITY_TRAITS[trait];
  const Icon = Icons[traitInfo.icon as keyof typeof Icons] || Icons.HelpCircle;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full p-4 rounded-lg border text-left",
        "transition-all duration-300 hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]",
        selected ? [
          "border-[rgb(var(--color-primary))]",
          "bg-[rgb(var(--color-primary))/0.1]",
          "text-[rgb(var(--color-primary))]"
        ] : [
          "border-[rgb(var(--color-border))]",
          "hover:border-[rgb(var(--color-primary))]",
          "hover:bg-[rgb(var(--color-primary))/0.05]"
        ]
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-lg transition-colors duration-300",
          selected ? "bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-inverse))]" : "bg-[rgb(var(--color-primary))/0.1]"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium">{trait}</h4>
          <p className={cn(
            "text-sm mt-1",
            selected ? "text-[rgb(var(--color-primary))/0.8]" : "text-[rgb(var(--color-text-secondary))]"
          )}>
            {traitInfo.description}
          </p>
        </div>
      </div>

      {recommended && (
        <span className={cn(
          "absolute -top-2 -right-2 px-2 py-1",
          "text-xs font-medium rounded-full",
          "bg-[rgb(var(--color-primary))] text-[rgb(var(--color-text-inverse))]",
          "border border-[rgb(var(--color-surface))]",
          "shadow-sm"
        )}>
          Recommandé
        </span>
      )}
    </button>
  );
}