import { supabase } from '@/lib/supabase';
import type { DashboardStats } from '@/types/stats';

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const { data: activeProjects, error: projectsError } = await supabase
    .from('projets')
    .select('id')
    .eq('user_id', userId)
    .eq('statut', 'en_cours');

  if (projectsError) throw projectsError;

  const { data: monthlyContent, error: contentError } = await supabase
    .from('contenus')
    .select('id')
    .gte('date_creation', new Date(new Date().setDate(1)).toISOString());

  if (contentError) throw contentError;

  const { data: activeProfiles, error: profilesError } = await supabase
    .from('profils_redacteurs')
    .select('id')
    .eq('user_id', userId);

  if (profilesError) throw profilesError;

  return {
    activeProjects: activeProjects.length,
    generatedContent: monthlyContent.length,
    activeProfiles: activeProfiles.length,
    satisfaction: 92 // Simulé pour l'instant
  };
}