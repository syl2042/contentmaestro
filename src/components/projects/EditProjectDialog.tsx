import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProjectForm } from './ProjectForm';
import { updateProject } from '@/lib/api/projects';
import type { Project, CreateProjectData } from '@/types/project';

interface EditProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSuccess?: () => void;
}

export function EditProjectDialog({ isOpen, onClose, project, onSuccess }: EditProjectDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateProjectData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Updating project with data:', data);
      await updateProject(project.id, data);
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to update project:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la mise à jour du projet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Modifier le projet</DialogTitle>
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          <ProjectForm 
            onSubmit={handleSubmit} 
            submitting={loading}
            initialData={{
              titre: project.titre,
              description: project.description,
              statut: project.statut,
              types_contenus: project.types_contenus
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}