import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Edit, Copy, Trash2, BookOpen, MessageSquare, Settings, FileText } from 'lucide-react';
import { WriterProfile } from '@/types/profile';
import { cn } from '@/lib/utils';
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface ProfileCardProps {
  profile: WriterProfile;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProfileCard({ profile, onEdit, onDuplicate, onDelete }: ProfileCardProps) {
  return (
    <Card variant="bordered" className="h-[400px] flex flex-col">
      <CardHeader>
        <div className="min-h-[80px] flex flex-col">
          <CardTitle className="text-xl font-bold text-[rgb(var(--color-text-primary))] line-clamp-2">
            {profile.nom_profil}
          </CardTitle>
          <p className="text-sm text-[rgb(var(--color-text-secondary))] line-clamp-2 mt-2">
            {profile.specialite_thematique}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))]">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <BookOpen className="h-4 w-4" />
              <span>Style</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))] mt-1 line-clamp-1">
              {profile.style_ecriture}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <MessageSquare className="h-4 w-4" />
              <span>Ton</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))] mt-1 line-clamp-1">
              {profile.ton}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <Settings className="h-4 w-4" />
              <span>Niveau</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))] mt-1 line-clamp-1">
              {profile.niveau_langage}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
              <FileText className="h-4 w-4" />
              <span>Contenus</span>
            </div>
            <p className="text-sm font-medium text-[rgb(var(--color-text-primary))] mt-1">
              0
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-center gap-2">
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(profile.id)}
                    className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Modifier</TooltipContent>
              </TooltipRoot>
            </TooltipProvider>

            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDuplicate(profile.id)}
                    className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Dupliquer</TooltipContent>
              </TooltipRoot>
            </TooltipProvider>

            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(profile.id)}
                    className="text-[rgb(var(--color-error))] hover:text-[rgb(var(--color-error))]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Supprimer</TooltipContent>
              </TooltipRoot>
            </TooltipProvider>
          </div>

          {profile.traits_personnalite && profile.traits_personnalite.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgb(var(--color-border))]">
              {profile.traits_personnalite.map((trait) => (
                <span
                  key={trait}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-full",
                    "bg-[#E3F2FD] text-[#1E88E5] dark:bg-[#1565C0] dark:text-white",
                    "shadow-sm hover:shadow-md",
                    "transition-all duration-300 hover:scale-105"
                  )}
                >
                  {trait}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}