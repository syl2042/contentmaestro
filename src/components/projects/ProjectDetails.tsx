import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectDetails } from '@/hooks/useProjectDetails';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EditProjectDialog } from './EditProjectDialog';
import { ArrowLeft, Calendar, FileText, BarChart } from 'lucide-react';
import { formatDate } from '@/utils/date';
import { PROJECT_STATUSES, CONTENT_TYPES } from '@/types/project';
import { cn } from '@/lib/utils';

export function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { project, loading, error } = useProjectDetails(projectId, user?.id);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-[rgb(var(--color-surface))] rounded-lg animate-pulse" />
        <div className="h-40 bg-[rgb(var(--color-surface))] rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6 rounded-lg bg-[rgb(var(--color-error)/0.1)] text-[rgb(var(--color-error))]">
        Une erreur est survenue lors du chargement du projet
      </div>
    );
  }

  const handleEditSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/projects')}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[rgb(var(--color-text-primary))]">
          {project.titre}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle>Détails du Projet</CardTitle>
                  {project.description && (
                    <p className="text-[rgb(var(--color-text-secondary))]">
                      {project.description}
                    </p>
                  )}
                </div>
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
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    <Calendar className="h-4 w-4" />
                    <span>Créé le</span>
                  </div>
                  <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
                    {formatDate(project.date_creation)}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
                    <FileText className="h-4 w-4" />
                    <span>Contenus</span>
                  </div>
                  <p className="text-sm font-medium text-[rgb(var(--color-text-primary))]">
                    {project.contentCount || 0}
                  </p>
                </div>
                <div className="space-y-1">
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
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types de Contenus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.types_contenus?.map((type, index) => {
                const contentType = CONTENT_TYPES.find(t => t.id === type.type_id);
                if (!contentType) return null;

                const selectedSubtypes = contentType.subtypes.filter(
                  st => type.subtype_ids.includes(st.id)
                );

                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[rgb(var(--color-primary)/0.1)]">
                          <FileText className="h-5 w-5 text-[rgb(var(--color-primary))]" />
                        </div>
                        <div>
                          <p className="font-medium text-[rgb(var(--color-text-primary))]">
                            {contentType.name}
                          </p>
                          <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                            {selectedSubtypes.length} sous-type{selectedSubtypes.length > 1 ? 's' : ''} sélectionné{selectedSubtypes.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <Button variant="default">
                        Générer
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedSubtypes.map((subtype) => (
                        <div
                          key={subtype.id}
                          className="p-3 rounded-md bg-[rgb(var(--color-primary)/0.1)] border border-[rgb(var(--color-primary)/0.2)]"
                        >
                          <p className="font-medium text-sm text-[rgb(var(--color-text-primary))]">
                            {subtype.name}
                          </p>
                          {subtype.description && (
                            <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-1">
                              {subtype.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Générer un Contenu
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => setIsEditDialogOpen(true)}
              >
                Modifier le Projet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {project && (
        <EditProjectDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          project={project}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}