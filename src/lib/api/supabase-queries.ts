import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables'];

export async function getProfilsRedacteurs(userId: string) {
  console.log('Fetching profiles for user:', userId);
  
  const { data, error } = await supabase
    .from('profils_redacteurs')
    .select('*')
    .eq('user_id', userId)
    .order('date_creation', { ascending: false });

  if (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }

  console.log('Fetched profiles:', data);
  return data;
}

export async function createProfilRedacteur(profil: Omit<Tables['profils_redacteurs']['Insert'], 'id'>) {
  console.log('Creating profile with data:', profil);

  // Ensure required fields are present
  const requiredFields = ['user_id', 'nom_profil', 'specialite_thematique', 'style_ecriture', 'ton', 'niveau_langage'];
  for (const field of requiredFields) {
    if (!profil[field as keyof typeof profil]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const { data, error } = await supabase
    .from('profils_redacteurs')
    .insert([{
      ...profil,
      date_creation: new Date().toISOString(),
      date_modification: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    throw error;
  }

  console.log('Profile created successfully:', data);
  return data;
}

export async function updateProfilRedacteur(
  id: string,
  updates: Partial<Tables['profils_redacteurs']['Update']>
) {
  console.log('Updating profile:', { id, updates });

  const { data, error } = await supabase
    .from('profils_redacteurs')
    .update({
      ...updates,
      date_modification: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  console.log('Profile updated successfully:', data);
  return data;
}

export async function deleteProfilRedacteur(id: string) {
  console.log('Deleting profile:', id);

  const { error } = await supabase
    .from('profils_redacteurs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }

  console.log('Profile deleted successfully');
}