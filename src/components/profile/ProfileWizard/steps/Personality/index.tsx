import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TraitHeader } from './TraitHeader';
import { TraitList } from './TraitList';
import { STYLE_TRAIT_RECOMMENDATIONS } from '@/constants/personalityTraits';
import type { WriterProfile } from '@/types/profile';

interface PersonalityProps {
  data: Partial<WriterProfile>;
  onComplete: (data: Partial<WriterProfile>) => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export function Personality({ data, onComplete, onPrevious, isLastStep }: PersonalityProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>(data.traits_personnalite || []);
  const [recommendedTraits, setRecommendedTraits] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.style_ecriture) {
      const recommendations = STYLE_TRAIT_RECOMMENDATIONS[data.style_ecriture] || [];
      setRecommendedTraits(recommendations);
      
      // Auto-select recommended traits if none are selected yet
      if (!data.traits_personnalite?.length) {
        setSelectedTraits(recommendations);
      }
    }
  }, [data.style_ecriture, data.traits_personnalite]);

  const handleTraitToggle = (trait: string) => {
    setSelectedTraits(prev => {
      const isSelected = prev.includes(trait);
      if (isSelected) {
        return prev.filter(t => t !== trait);
      } else {
        return [...prev, trait];
      }
    });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedTraits.length === 0) {
      setError('Sélectionnez au moins un trait de personnalité');
      return;
    }

    onComplete({
      traits_personnalite: selectedTraits,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <TraitHeader 
          selectedStyle={data.style_ecriture} 
          hasRecommendations={recommendedTraits.length > 0} 
        />

        <TraitList
          selectedTraits={selectedTraits}
          recommendedTraits={recommendedTraits}
          onTraitToggle={handleTraitToggle}
        />

        {error && (
          <p className="text-sm text-[rgb(var(--color-error))]">{error}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="submit">
          {isLastStep ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </form>
  );
}