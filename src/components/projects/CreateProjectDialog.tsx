import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProjectForm } from './ProjectForm';
import { createProject } from '@/lib/api/projects';
import { useAuth } from '@/contexts/AuthContext';
import type { CreateProjectData } from '@/types/project';

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateProjectDialog({ isOpen, onClose, onSuccess }: CreateProjectDialogProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateProjectData) => {
    if (!user?.id) {
      setError('Utilisateur non connecté');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Creating project with data:', data);
      await createProject(user.id, data);
      
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to create project:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création du projet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Créer un nouveau projet</DialogTitle>
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          <ProjectForm onSubmit={handleSubmit} submitting={loading} />
        </div>
      </DialogContent>
    </Dialog>
  );
}