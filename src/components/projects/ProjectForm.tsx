import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PROJECT_STATUSES, CONTENT_TYPES } from '@/types/project';
import type { CreateProjectData } from '@/types/project';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const projectSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  statut: z.enum(['en_cours', 'termine', 'archive']),
  types_contenus: z.array(z.object({
    type_id: z.string(),
    subtype_ids: z.array(z.string()).min(1, 'Sélectionnez au moins un sous-type')
  })).min(1, 'Sélectionnez au moins un type de contenu')
});

interface ProjectFormProps {
  onSubmit: (data: CreateProjectData) => Promise<void>;
  submitting?: boolean;
  initialData?: Partial<CreateProjectData>;
}

export function ProjectForm({ onSubmit, submitting = false, initialData }: ProjectFormProps) {
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger
  } = useForm<CreateProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titre: initialData?.titre || '',
      description: initialData?.description || '',
      statut: initialData?.statut || 'en_cours',
      types_contenus: initialData?.types_contenus || []
    }
  });

  const selectedTypes = watch('types_contenus') || [];

  const toggleTypeExpansion = (typeId: string) => {
    setExpandedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleTypeChange = async (typeId: string, checked: boolean) => {
    const currentTypes = getValues('types_contenus') || [];
    if (checked) {
      setValue('types_contenus', [...currentTypes, { type_id: typeId, subtype_ids: [] }]);
      if (!expandedTypes.includes(typeId)) {
        setExpandedTypes(prev => [...prev, typeId]);
      }
    } else {
      setValue(
        'types_contenus',
        currentTypes.filter(t => t.type_id !== typeId)
      );
      setExpandedTypes(prev => prev.filter(id => id !== typeId));
    }
    await trigger('types_contenus');
  };

  const handleSubtypeChange = async (typeId: string, subtypeId: string, checked: boolean) => {
    const currentTypes = [...(getValues('types_contenus') || [])];
    const typeIndex = currentTypes.findIndex(t => t.type_id === typeId);
    
    if (typeIndex === -1) return;

    const updatedTypes = [...currentTypes];
    const currentSubtypes = updatedTypes[typeIndex].subtype_ids;

    if (checked) {
      updatedTypes[typeIndex].subtype_ids = [...currentSubtypes, subtypeId];
    } else {
      updatedTypes[typeIndex].subtype_ids = currentSubtypes.filter(id => id !== subtypeId);
    }

    setValue('types_contenus', updatedTypes);
    await trigger('types_contenus');
  };

  const handleFormSubmit = async (data: CreateProjectData) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="titre">Titre du projet</Label>
          <Input
            id="titre"
            {...register('titre')}
            className={cn(
              errors.titre && "border-[rgb(var(--color-error))] focus-visible:ring-[rgb(var(--color-error))]"
            )}
          />
          {errors.titre && (
            <p className="text-sm text-[rgb(var(--color-error))]">{errors.titre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className={cn(
              "flex w-full rounded-md border border-[rgb(var(--color-border))]",
              "bg-[rgb(var(--color-surface))] px-3 py-2 text-sm shadow-sm",
              "text-[rgb(var(--color-text-primary))]",
              "placeholder:text-[rgb(var(--color-text-secondary))]",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--color-primary))]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="statut">Statut</Label>
          <select
            id="statut"
            {...register('statut')}
            className={cn(
              "flex h-9 w-full rounded-md border border-[rgb(var(--color-border))]",
              "bg-[rgb(var(--color-surface))] px-3 py-1 text-sm shadow-sm",
              "text-[rgb(var(--color-text-primary))]",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--color-primary))]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {Object.entries(PROJECT_STATUSES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Types de contenus</Label>
          <div className="space-y-4">
            {CONTENT_TYPES.map((type) => {
              const selectedType = selectedTypes.find(t => t.type_id === type.id);
              const isTypeSelected = !!selectedType;
              const isExpanded = expandedTypes.includes(type.id);

              return (
                <div 
                  key={type.id} 
                  className={cn(
                    "rounded-lg border border-[rgb(var(--color-border))]",
                    "bg-[rgb(var(--color-surface))]",
                    "overflow-hidden"
                  )}
                >
                  <div 
                    className={cn(
                      "flex items-center justify-between p-4 cursor-pointer",
                      "transition-colors",
                      isTypeSelected 
                        ? "bg-[rgb(var(--color-primary)/0.1)]" 
                        : "hover:bg-[rgb(var(--color-primary)/0.05)]"
                    )}
                    onClick={() => toggleTypeExpansion(type.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isTypeSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleTypeChange(type.id, e.target.checked);
                        }}
                        className={cn(
                          "rounded border-[rgb(var(--color-border))]",
                          "text-[rgb(var(--color-primary))]",
                          "focus:ring-[rgb(var(--color-primary))]"
                        )}
                      />
                      <span className="font-medium text-[rgb(var(--color-text-primary))]">
                        {type.name}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-[rgb(var(--color-text-secondary))]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[rgb(var(--color-text-secondary))]" />
                    )}
                  </div>

                  {isExpanded && isTypeSelected && (
                    <div className="p-4 border-t border-[rgb(var(--color-border))]">
                      <div className="grid grid-cols-2 gap-3">
                        {type.subtypes.map((subtype) => (
                          <label
                            key={subtype.id}
                            className={cn(
                              "flex items-center p-3 rounded-md border",
                              "transition-colors duration-200",
                              selectedType.subtype_ids.includes(subtype.id)
                                ? "border-[rgb(var(--color-primary)/0.3)] bg-[rgb(var(--color-primary)/0.1)]"
                                : "border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-primary)/0.05)]"
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={selectedType.subtype_ids.includes(subtype.id)}
                              onChange={(e) => handleSubtypeChange(type.id, subtype.id, e.target.checked)}
                              className={cn(
                                "rounded border-[rgb(var(--color-border))]",
                                "text-[rgb(var(--color-primary))]",
                                "focus:ring-[rgb(var(--color-primary))]"
                              )}
                            />
                            <div className="ml-2">
                              <span className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
                                {subtype.name}
                              </span>
                              {subtype.description && (
                                <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                                  {subtype.description}
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {errors.types_contenus && (
            <p className="text-sm text-[rgb(var(--color-error))]">
              {errors.types_contenus.message}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-[rgb(var(--color-error)/0.1)] text-[rgb(var(--color-error))]">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 mt-6 flex justify-end bg-[rgb(var(--color-surface))] py-4 border-t border-[rgb(var(--color-border))]">
        <Button 
          type="submit" 
          disabled={submitting}
          className="relative"
        >
          {submitting ? (
            <>
              <span className="opacity-0">
                {initialData ? 'Mettre à jour le projet' : 'Créer le projet'}
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-[rgb(var(--color-surface))/0.2] border-t-[rgb(var(--color-surface))] rounded-full animate-spin" />
              </div>
            </>
          ) : (
            initialData ? 'Mettre à jour le projet' : 'Créer le projet'
          )}
        </Button>
      </div>
    </form>
  );
}