import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTENT_TYPES } from '@/types/project';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Types de Contenus</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Générer un Contenu
        </Button>
      </div>

      <div className="space-y-6">
        {project.types_contenus.map((typeContent) => {
          const contentType = CONTENT_TYPES.find(t => t.id === typeContent.type_id);
          if (!contentType) return null;

          const selectedSubtypes = contentType.subtypes.filter(
            st => typeContent.subtype_ids.includes(st.id)
          );

          return (
            <div
              key={typeContent.type_id}
              className={cn(
                "p-6 rounded-lg border",
                "bg-gradient-to-br from-white to-gray-50/50",
                "transition-all duration-200 hover:shadow-md"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{contentType.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedSubtypes.length} sous-type{selectedSubtypes.length > 1 ? 's' : ''} sélectionné{selectedSubtypes.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Générer
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {selectedSubtypes.map((subtype) => (
                  <div
                    key={subtype.id}
                    className={cn(
                      "p-3 rounded-md",
                      "bg-primary/5 border border-primary/10"
                    )}
                  >
                    <p className="font-medium text-sm">{subtype.name}</p>
                    {subtype.description && (
                      <p className="text-xs text-gray-500 mt-1">{subtype.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}