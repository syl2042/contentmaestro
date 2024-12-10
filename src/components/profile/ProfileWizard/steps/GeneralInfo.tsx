import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SPECIALTIES } from '@/constants/profileOptions';
import type { WriterProfile } from '@/types/profile';

interface GeneralInfoProps {
  data: Partial<WriterProfile>;
  onComplete: (data: Partial<WriterProfile>) => void;
  onPrevious: () => void;
}

export function GeneralInfo({ data, onComplete }: GeneralInfoProps) {
  const [selectedSpeciality, setSelectedSpeciality] = useState(data.specialite_thematique || '');
  const [customSpeciality, setCustomSpeciality] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.specialite_thematique && !SPECIALTIES.find(s => s.value === data.specialite_thematique)) {
      setSelectedSpeciality('custom');
      setCustomSpeciality(data.specialite_thematique || '');
    }
  }, [data.specialite_thematique]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nom_profil = formData.get('nom_profil') as string;
    
    let specialite_thematique = selectedSpeciality;
    if (selectedSpeciality === 'custom') {
      if (!customSpeciality.trim()) {
        setError('Veuillez décrire votre spécialité');
        return;
      }
      specialite_thematique = customSpeciality.trim();
    }
    
    onComplete({
      nom_profil,
      specialite_thematique,
    });
  };

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpeciality(e.target.value);
    if (e.target.value !== 'custom') {
      setCustomSpeciality('');
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nom_profil">
            Nom du Profil
          </Label>
          <Input
            type="text"
            id="nom_profil"
            name="nom_profil"
            required
            defaultValue={data.nom_profil}
            placeholder="Ex: Rédacteur Tech Senior"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialite_thematique">
            Spécialité Thématique
          </Label>
          <select
            id="specialite_thematique"
            value={selectedSpeciality}
            onChange={handleSpecialityChange}
            className={cn(
              "flex h-9 w-full rounded-md border border-[rgb(var(--color-border))]",
              "bg-[rgb(var(--color-surface))] px-3 py-1 text-sm shadow-sm",
              "text-[rgb(var(--color-text-primary))]",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--color-primary))]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <option value="">Sélectionnez une spécialité</option>
            {SPECIALTIES.map(specialty => (
              <option key={specialty.value} value={specialty.value}>
                {specialty.label}
              </option>
            ))}
          </select>
        </div>

        {selectedSpeciality === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom_speciality">
              Votre Spécialité Personnalisée
            </Label>
            <Input
              type="text"
              id="custom_speciality"
              value={customSpeciality}
              onChange={(e) => {
                setCustomSpeciality(e.target.value);
                setError(null);
              }}
              placeholder="Décrivez votre spécialité ici"
              className={cn(
                error && "border-[rgb(var(--color-error))] focus-visible:ring-[rgb(var(--color-error))]"
              )}
            />
            {error && (
              <p className="text-sm text-[rgb(var(--color-error))]">{error}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">
          Suivant
        </Button>
      </div>
    </form>
  );
}