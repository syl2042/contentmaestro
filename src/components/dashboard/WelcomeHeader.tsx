import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  prenom: string | null;
}

export function WelcomeHeader() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('users')
          .select('prenom')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user?.id]);

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary)/0.7)] bg-clip-text text-transparent">
        {loading ? (
          <span className="animate-pulse">Chargement...</span>
        ) : (
          `Bonjour, ${userProfile?.prenom || 'Utilisateur'}`
        )}
      </h1>
      <p className="text-base text-[rgb(var(--color-text-secondary))]">
        {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
      </p>
    </div>
  );
}