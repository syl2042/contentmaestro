import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/utils/date';

export function RecentProjects() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, loading, error } = useProjects(user?.id || '');

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[rgb(var(--color-text-primary))]">Projets Récents</h2>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-40 rounded-xl bg-[rgb(var(--color-surface))] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-[rgb(var(--color-error)/0.1)] text-[rgb(var(--color-error))]">
        Une erreur est survenue lors du chargement des projets
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[rgb(var(--color-text-primary))]">Projets Récents</h2>
        <Button variant="ghost" className="text-sm" onClick={() => navigate('/projects')}>
          Voir tout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} variant="bordered">
            <CardHeader>
              <CardTitle>{project.titre}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                  {formatDate(project.date_creation)}
                </div>
                <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                  {project.contentCount} contenu{project.contentCount !== 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button 
                variant="default"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                Ouvrir le Projet
              </Button>
              <Button 
                variant="default"
                onClick={() => navigate(`/projects/${project.id}/details`)}
              >
                Voir les Détails
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}