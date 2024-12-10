import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ContentGenerationConfig } from '../types';
import { Button, Input, Label } from '@/components/ui';

const contentGenerationSchema = z.object({
  contentType: z.string().min(1, 'Le type de contenu est requis'),
  tone: z.string().min(1, 'Le ton est requis'),
  style: z.string().min(1, 'Le style est requis'),
  length: z.number().min(100).max(10000),
  keywords: z.array(z.string()),
  targetAudience: z.string(),
  seoOptimization: z.boolean(),
});

interface ContentGenerationFormProps {
  profileId: string;
  projectId: string;
  onSubmit: (config: ContentGenerationConfig) => Promise<void>;
  isSubmitting?: boolean;
}

export function ContentGenerationForm({
  profileId,
  projectId,
  onSubmit,
  isSubmitting = false,
}: ContentGenerationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentGenerationConfig>({
    resolver: zodResolver(contentGenerationSchema),
    defaultValues: {
      profileId,
      projectId,
      parameters: {
        seoOptimization: true,
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="contentType">Type de Contenu</Label>
          <Input
            id="contentType"
            {...register('contentType')}
            className={errors.contentType ? 'border-red-500' : ''}
          />
          {errors.contentType && (
            <p className="mt-1 text-sm text-red-500">{errors.contentType.message}</p>
          )}
        </div>

        {/* Add other form fields here */}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Génération en cours...' : 'Générer le Contenu'}
      </Button>
    </form>
  );
}