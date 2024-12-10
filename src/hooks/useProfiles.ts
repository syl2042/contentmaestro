import { useState, useEffect, useCallback } from 'react';
import { 
  getProfilsRedacteurs, 
  createProfilRedacteur, 
  updateProfilRedacteur, 
  deleteProfilRedacteur 
} from '@/lib/api/supabase-queries';
import type { WriterProfile } from '@/types/profile';

export function useProfiles(userId: string | undefined) {
  const [profiles, setProfiles] = useState<WriterProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfiles = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getProfilsRedacteurs(userId);
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profiles'));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const validateProfile = (profile: Omit<WriterProfile, 'id'>) => {
    const requiredFields = [
      'nom_profil',
      'specialite_thematique',
      'style_ecriture',
      'ton',
      'niveau_langage',
      'traits_personnalite',
      'parametres_seo',
      'user_id'
    ];

    for (const field of requiredFields) {
      if (!profile[field as keyof typeof profile]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!profile.parametres_seo.densite_mots_cles && profile.parametres_seo.densite_mots_cles !== 0) {
      throw new Error('Missing densite_mots_cles in parametres_seo');
    }

    if (typeof profile.parametres_seo.meta_descriptions !== 'boolean') {
      throw new Error('meta_descriptions must be a boolean in parametres_seo');
    }
  };

  const createProfile = async (profile: Omit<WriterProfile, 'id'>) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      validateProfile(profile);
      
      console.log('Creating profile with validated data:', profile);
      const newProfile = await createProfilRedacteur(profile);
      console.log('New profile created:', newProfile);
      
      setProfiles(prevProfiles => [newProfile, ...prevProfiles]);
      return newProfile;
    } catch (err) {
      console.error('Error in createProfile:', err);
      throw err instanceof Error ? err : new Error('Failed to create profile');
    }
  };

  const updateProfile = async (id: string, updates: Partial<WriterProfile>) => {
    try {
      const updatedProfile = await updateProfilRedacteur(id, updates);
      setProfiles(profiles.map(p => p.id === id ? updatedProfile : p));
      return updatedProfile;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update profile');
    }
  };

  const deleteProfile = async (id: string) => {
    try {
      await deleteProfilRedacteur(id);
      setProfiles(profiles.filter(p => p.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete profile');
    }
  };

  return {
    profiles,
    loading,
    error,
    createProfile,
    updateProfile,
    deleteProfile,
    refreshProfiles: fetchProfiles,
  };
}