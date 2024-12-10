import React from 'react';
import { FolderOpen, FileText, Users, ThumbsUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useStats } from '@/hooks/useStats';
import { useAuth } from '@/contexts/AuthContext';
import type { StatsCardConfig } from '@/types/stats';

export function StatsSection() {
  const { user } = useAuth();
  const { stats, loading, error } = useStats(user?.id);

  const statsConfig: StatsCardConfig[] = [
    {
      title: "Projets Actifs",
      value: stats?.activeProjects ?? 0,
      description: `${stats?.activeProjects ?? 0} en cours`,
      icon: FolderOpen,
      variant: 'projects'
    },
    {
      title: "Contenus Générés",
      value: stats?.generatedContent ?? 0,
      description: "Ce mois-ci",
      icon: FileText,
      variant: 'content'
    },
    {
      title: "Profils de Rédacteurs",
      value: stats?.activeProfiles ?? 0,
      description: "Profils actifs",
      icon: Users,
      variant: 'profiles'
    },
    {
      title: "Taux de Satisfaction",
      value: `${stats?.satisfaction ?? 0}%`,
      description: "Basé sur les retours",
      icon: ThumbsUp,
      variant: 'satisfaction'
    }
  ];

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-destructive/5 text-destructive">
        Une erreur est survenue lors du chargement des statistiques
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((config) => (
        <StatsCard
          key={config.title}
          loading={loading}
          {...config}
        />
      ))}
    </div>
  );
}