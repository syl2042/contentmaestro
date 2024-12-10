import React from 'react';
import { Label } from '@/components/ui/label';

interface TraitHeaderProps {
  selectedStyle?: string;
  hasRecommendations: boolean;
}

export function TraitHeader({ selectedStyle, hasRecommendations }: TraitHeaderProps) {
  return (
    <div className="space-y-2">
      <Label>Traits de Personnalité</Label>
      <p className="text-sm text-[rgb(var(--color-text-secondary))]">
        Sélectionnez les traits qui définissent le mieux votre style d'écriture.
        {selectedStyle && hasRecommendations && (
          <> Les traits recommandés sont basés sur le style d'écriture choisi :  <b>{selectedStyle}</b>.</>
        )}
      </p>
    </div>
  );
}