import React from 'react';
import { BarChart3, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectStatsProps {
  project: Project;
}

export function ProjectStats({ project }: ProjectStatsProps) {
  const stats = [
    {
      label: 'Progression',
      value: `${project.progression}%`,
      icon: BarChart3,
      color: 'blue'
    },
    {
      label: 'Types de Contenus',
      value: project.types_contenus.length,
      icon: FileText,
      color: 'emerald'
    },
    {
      label: 'Temps Écoulé',
      value: '2 jours',
      icon: Clock,
      color: 'violet'
    }
  ];

  return (
    <div className={cn(
      "rounded-xl border p-6",
      "bg-gradient-to-br from-white to-gray-50/50"
    )}>
      <h2 className="text-lg font-semibold mb-6">Statistiques du Projet</h2>
      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              stat.color === 'blue' && "bg-blue-100 text-blue-600",
              stat.color === 'emerald' && "bg-emerald-100 text-emerald-600",
              stat.color === 'violet' && "bg-violet-100 text-violet-600"
            )}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}