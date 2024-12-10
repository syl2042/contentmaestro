import React from 'react';
import { TraitCard } from './TraitCard';
import { PERSONALITY_TRAITS } from '@/constants/personalityTraits';

interface TraitListProps {
  selectedTraits: string[];
  recommendedTraits: string[];
  onTraitToggle: (trait: string) => void;
}

export function TraitList({ selectedTraits, recommendedTraits, onTraitToggle }: TraitListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Object.keys(PERSONALITY_TRAITS).map((trait) => (
        <TraitCard
          key={trait}
          trait={trait as keyof typeof PERSONALITY_TRAITS}
          selected={selectedTraits.includes(trait)}
          recommended={recommendedTraits.includes(trait)}
          onClick={() => onTraitToggle(trait)}
        />
      ))}
    </div>
  );
}