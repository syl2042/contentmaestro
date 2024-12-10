import { supabase } from '@/lib/supabase';
import { CONTENT_TYPES } from '@/types/project';
import type { Contenu } from '@/types/contenu';

export async function getContenusParProfil(profilId: string) {
  const { data, error } = await supabase
    .from('contenus')
    .select(`
      id,
      titre,
      categorie,
      type_contenu,
      contenu_texte,
      contenu_audio,
      contenu_image,
      statut,
      date_creation,
      date_modification
    `)
    .eq('id_profil_redacteur', profilId)
    .order('date_creation', { ascending: false });

  if (error) {
    console.error('Error fetching contenus:', error);
    throw error;
  }

  return data as Contenu[];
}

export async function getContenusStats(profilId: string) {
  const { count, error } = await supabase
    .from('contenus')
    .select('*', { count: 'exact', head: true })
    .eq('id_profil_redacteur', profilId);

  if (error) {
    console.error('Error fetching contenus stats:', error);
    throw error;
  }

  return count || 0;
}

export async function getContenusParCategorie(userId: string, projectStatus?: string | null) {
  try {
    let query = supabase
      .from('projets')
      .select(`
        sous_types_contenus
      `)
      .eq('user_id', userId);

    if (projectStatus) {
      query = query.eq('statut', projectStatus);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching contenus by category:', error);
      throw error;
    }

    // Aggregate all content types and their subtypes
    const typeCounts: Record<string, number> = {};
    
    data.forEach(project => {
      if (project.sous_types_contenus) {
        (project.sous_types_contenus as any[]).forEach(type => {
          const typeId = type.type_id;
          const subtypeCount = type.subtype_ids?.length || 0;
          typeCounts[typeId] = (typeCounts[typeId] || 0) + subtypeCount;
        });
      }
    });

    // Convert to array format and map type_id to readable names
    return Object.entries(typeCounts).map(([typeId, count]) => {
      const contentType = CONTENT_TYPES.find(type => type.id === typeId);
      return {
        categorie: contentType?.name || typeId,
        count
      };
    }).sort((a, b) => b.count - a.count);
  } catch (err) {
    console.error('Error in getContenusParCategorie:', err);
    throw err;
  }
}