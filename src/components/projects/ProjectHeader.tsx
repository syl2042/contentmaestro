import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/utils/date';
import { PROJECT_STATUSES } from '@/types/project';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {project.titre}
          </h1>
          {project.description && (
            <p className="text-gray-500">{project.description}</p>
          )}
        </div>
        <span className={cn(
          "inline-flex items-center rounded-full px-3 py-1",
          "text-sm font-medium",
          project.statut === 'en_cours' && "bg-blue-100 text-blue-700",
          project.statut === 'termine' && "bg-green-100 text-green-700",
          project.statut === 'archive' && "bg-gray-100 text-gray-700"
        )}>
          {PROJECT_STATUSES[project.statut]}
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Créé le {formatDate(project.date_creation, 'full')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Dernière modification le {formatDate(project.date_modification, 'full')}</span>
        </div>
      </div>
    </div>
  );
}