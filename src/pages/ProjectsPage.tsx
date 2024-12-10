import React, { useState } from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectTable } from '@/components/projects/ProjectTable';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, LayoutGrid, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useProjects } from '@/hooks/useProjects';
import { 
  TooltipProvider, 
  TooltipRoot, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';

export function ProjectsPage() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const { projects, loading, error } = useProjects(user?.id || '');

  const filteredProjects = projects.filter(project => {
    const matchesStatus = !filterStatus || project.statut === filterStatus;
    const matchesSearch = !searchQuery || 
      project.titre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleProjectCreated = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Mes Projets
            </h1>
          </div>
          <p className="text-base text-primary/60">
            Gérez vos projets et suivez leur progression
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex rounded-lg border border-gray-200 p-1">
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "px-3",
                      viewMode === 'grid' && "bg-primary/10"
                    )}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Vue en grille</TooltipContent>
              </TooltipRoot>
            </TooltipProvider>

            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "px-3",
                      viewMode === 'table' && "bg-primary/10"
                    )}
                    onClick={() => setViewMode('table')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Vue en liste</TooltipContent>
              </TooltipRoot>
            </TooltipProvider>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className={cn(
              "gap-2 shadow-lg shadow-primary/20",
              "bg-gradient-to-r from-primary to-primary/90",
              "hover:shadow-xl hover:shadow-primary/30",
              "transition-all duration-300 hover:scale-105",
              "rounded-xl"
            )}
          >
            <Plus className="h-4 w-4" />
            Nouveau Projet
          </Button>
        </div>
      </div>

      <ProjectFilters
        onStatusChange={setFilterStatus}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
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
      ) : error ? (
        <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive">
          <p className="font-medium">Une erreur est survenue</p>
          <p className="text-sm mt-1 text-destructive/80">{error.message}</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={filteredProjects} />
      )}

      <CreateProjectDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleProjectCreated}
      />
    </div>
  );
}