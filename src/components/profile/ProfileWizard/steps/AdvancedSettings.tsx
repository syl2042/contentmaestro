import React from 'react';
import { Button } from '@/components/ui/button';
import type { WriterProfile } from '@/types/profile';

interface AdvancedSettingsProps {
  data: Partial<WriterProfile>;
  onComplete: (data: Partial<WriterProfile>) => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export function AdvancedSettings({ data, onComplete, onPrevious, isLastStep }: AdvancedSettingsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onComplete({
      parametres_seo: {
        densite_mots_cles: Number(formData.get('densite_mots_cles')),
        meta_descriptions: formData.get('meta_descriptions') === 'on',
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Paramètres SEO</h3>
          <div>
            <label htmlFor="densite_mots_cles" className="block text-sm font-medium text-gray-700">
              Densité de Mots-clés (%)
            </label>
            <input
              type="number"
              id="densite_mots_cles"
              name="densite_mots_cles"
              min="0"
              max="5"
              step="0.1"
              required
              defaultValue={data.parametres_seo?.densite_mots_cles}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="meta_descriptions"
                defaultChecked={data.parametres_seo?.meta_descriptions}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                Méta-descriptions optimisées
              </span>
            </label>
          </div>
        </div>
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