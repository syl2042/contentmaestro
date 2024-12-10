import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Eye, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface RecentProjectCardProps {
  project: Project;
}

export function RecentProjectCard({ project }: RecentProjectCardProps) {
  const navigate = useNavigate();

  const statusStyles = {
    'Terminé': 'bg-green-100 text-green-700 ring-1 ring-green-600/20',
    'En cours': 'bg-amber-100 text-amber-700 ring-1 ring-amber-600/20',
    'En attente': 'bg-gray-100 text-gray-700 ring-1 ring-gray-600/20',
  };

  const progressBarColors = {
    'Terminé': 'bg-green-600',
    'En cours': 'bg-amber-600',
    'En attente': 'bg-gray-600',
  };

  return (
    <div className={cn(
      "flex flex-col space-y-4 rounded-xl border",
      "bg-gradient-to-br from-white to-gray-50/50 p-4",
      "shadow-sm transition-all duration-200 hover:shadow-md"
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900">{project.titre}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {formatDate(project.date_creation)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            {project.contentCount} contenu{project.contentCount !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="text-sm">
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1",
            "text-xs font-medium",
            statusStyles[project.status]
          )}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300",
              progressBarColors[project.status]
            )}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{project.progress}%</span>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-2 bg-white hover:bg-gray-50"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <ExternalLink className="h-4 w-4" />
          Ouvrir le Projet
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-2 bg-white hover:bg-gray-50"
          onClick={() => navigate(`/projects/${project.id}/details`)}
        >
          <Eye className="h-4 w-4" />
          Voir les Détails
        </Button>
      </div>
    </div>
  );
}