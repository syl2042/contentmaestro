import { useState } from 'react';
import type { ContentTemplate } from '../types';
import { supabase } from '@/lib/supabase';

export function useContentTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getTemplates = async (): Promise<ContentTemplate[]> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('content_templates')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;

      return data || [];
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch templates');
      setError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (template: Omit<ContentTemplate, 'id'>): Promise<ContentTemplate | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('content_templates')
        .insert([template])
        .select()
        .single();

      if (createError) throw createError;

      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create template');
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getTemplates,
    createTemplate,
    loading,
    error,
  };
}