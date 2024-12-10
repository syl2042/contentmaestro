import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { PROJECT_STATUSES } from '@/types/project';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
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
    <Card variant="bordered" className="hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start w-full">
          <CardTitle>{project.titre}</CardTitle>
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            project.statut === 'en_cours' && "bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]",
            project.statut === 'termine' && "bg-[rgb(var(--color-success)/0.1)] text-[rgb(var(--color-success))]",
            project.statut === 'archive' && "bg-[rgb(var(--color-secondary)/0.1)] text-[rgb(var(--color-secondary))]"
          )}>
            {PROJECT_STATUSES[project.statut]}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <Calendar className="h-4 w-4" />
              <span>Créé le</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
              {formatDateShort(project.date_creation)}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <FileText className="h-4 w-4" />
              <span>Contenus</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
              {project.contentCount || 0}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <BarChart className="h-4 w-4" />
              <span>Progression</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
              {project.progression}%
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          variant="default"
          className="w-full"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
}