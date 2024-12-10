import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  userId?: string;
  statusFilter: string | null;
  searchQuery: string;
}

export function ProjectList({ userId, statusFilter, searchQuery }: ProjectListProps) {
  const { projects, loading, error } = useProjects(userId || '');

  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const matchesStatus = !statusFilter || project.statut === statusFilter;
      const matchesSearch = !searchQuery || 
        project.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [projects, statusFilter, searchQuery]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={cn(
              "h-64 rounded-2xl",
              "bg-gradient-to-br from-primary/5 to-primary/10",
              "animate-pulse"
            )}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive">
        <p className="font-medium">Une erreur est survenue</p>
        <p className="text-sm mt-1 text-destructive/80">{error.message}</p>
      </div>
    );
  }

  if (!filteredProjects.length) {
    return (
      <div className="text-center p-12 rounded-2xl border border-dashed border-primary/20">
        <p className="text-lg font-medium text-primary/60">
          Aucun projet trouvé
        </p>
        <p className="text-sm text-primary/40 mt-1">
          {searchQuery ? 
            'Essayez de modifier vos critères de recherche' : 
            'Commencez par créer votre premier projet'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}