import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PROJECT_STATUSES } from '@/types/project';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const navigate = useNavigate();

  const formatDateShort = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Date invalide';
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="relative overflow-x-auto rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgb(var(--color-border))]">
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Titre
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Statut
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Date de création
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Contenus
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Progression
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr 
              key={project.id} 
              className={cn(
                "border-b border-[rgb(var(--color-border))]",
                "transition-colors hover:bg-[rgb(var(--color-primary)/0.05)]"
              )}
            >
              <td className="px-4 py-3">
                <span className="font-medium text-[rgb(var(--color-text-primary))]">
                  {project.titre}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1",
                  "text-xs font-medium",
                  project.statut === 'en_cours' && "bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]",
                  project.statut === 'termine' && "bg-[rgb(var(--color-success)/0.1)] text-[rgb(var(--color-success))]",
                  project.statut === 'archive' && "bg-[rgb(var(--color-secondary)/0.1)] text-[rgb(var(--color-secondary))]"
                )}>
                  {PROJECT_STATUSES[project.statut]}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-[rgb(var(--color-text-secondary))]">
                {formatDateShort(project.date_creation)}
              </td>
              <td className="px-4 py-3 text-center text-sm text-[rgb(var(--color-text-secondary))]">
                {project.contentCount || 0}
              </td>
              <td className="px-4 py-3 text-center text-sm text-[rgb(var(--color-text-secondary))]">
                {project.progression}%
              </td>
              <td className="px-4 py-3 text-right">
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  Voir les détails
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}