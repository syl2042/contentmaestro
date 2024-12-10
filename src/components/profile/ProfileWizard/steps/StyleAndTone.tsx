import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { WRITING_STYLES, LANGUAGE_LEVELS } from '@/constants/profileOptions';
import type { WriterProfile } from '@/types/profile';

interface StyleAndToneProps {
  data: Partial<WriterProfile>;
  onComplete: (data: Partial<WriterProfile>) => void;
  onPrevious: () => void;
}

export function StyleAndTone({ data, onComplete, onPrevious }: StyleAndToneProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onComplete({
      style_ecriture: formData.get('style_ecriture') as string,
      ton: formData.get('ton') as string,
      niveau_langage: formData.get('niveau_langage') as string,
    });
  };

  const selectClassName = cn(
    "flex h-9 w-full rounded-md border border-[rgb(var(--color-border))]",
    "bg-[rgb(var(--color-surface))] px-3 py-1 text-sm shadow-sm",
    "text-[rgb(var(--color-text-primary))]",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--color-primary))]",
    "disabled:cursor-not-allowed disabled:opacity-50"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="style_ecriture">
            Style d'Écriture
          </Label>
          <select
            id="style_ecriture"
            name="style_ecriture"
            required
            defaultValue={data.style_ecriture}
            className={selectClassName}
          >
            <option value="">Sélectionnez un style</option>
            {WRITING_STYLES.map(style => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ton">
            Ton
          </Label>
          <select
            id="ton"
            name="ton"
            required
            defaultValue={data.ton}
            className={selectClassName}
          >
            <option value="">Sélectionnez un ton</option>
            <option value="Formel">Formel</option>
            <option value="Informel">Informel</option>
            <option value="Amical">Amical</option>
            <option value="Enthousiaste">Enthousiaste</option>
            <option value="Serieux">Sérieux</option>
            <option value="Convivial">Convivial</option>
            <option value="Neutre">Neutre</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="niveau_langage">
            Niveau de Langage
          </Label>
          <select
            id="niveau_langage"
            name="niveau_langage"
            required
            defaultValue={data.niveau_langage}
            className={selectClassName}
          >
            <option value="">Sélectionnez un niveau</option>
            {LANGUAGE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="submit">
          Suivant
        </Button>
      </div>
    </form>
  );
}