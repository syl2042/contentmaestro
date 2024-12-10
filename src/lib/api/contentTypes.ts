import { supabase } from '@/lib/supabase';
import type { ContentType } from '@/types/contentTypes';

export async function getContentTypes(): Promise<ContentType[]> {
  const { data, error } = await supabase
    .from('types_contenus')
    .select('*')
    .order('type_principal', { ascending: true });

  if (error) {
    console.error('Error fetching content types:', error);
    throw error;
  }

  return data.map(type => ({
    id: type.id,
    type_principal: type.type_principal,
    sous_type: type.sous_type
  }));
}