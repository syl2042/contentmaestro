import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Copy, Trash2, BookOpen, MessageSquare, Settings, FileText } from 'lucide-react';
import { WriterProfile } from '@/types/profile';
import { useContenus } from '@/hooks/useContenus';
import { cn } from '@/lib/utils';

interface ProfileTableProps {
  profiles: WriterProfile[];
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProfileTable({ profiles, onEdit, onDuplicate, onDelete }: ProfileTableProps) {
  return (
    <div className="relative overflow-x-auto rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgb(var(--color-border))]">
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Nom du profil
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Spécialité
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Style
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Ton
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Contenus
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-[rgb(var(--color-text-secondary))]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => {
            const { totalContenus } = useContenus(profile.id);
            
            return (
              <tr 
                key={profile.id} 
                className={cn(
                  "border-b border-[rgb(var(--color-border))]",
                  "transition-colors hover:bg-[rgb(var(--color-primary)/0.05)]"
                )}
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-[rgb(var(--color-text-primary))]">
                    {profile.nom_profil}
                  </span>
                </td>
                <td className="px-4 py-3 text-[rgb(var(--color-text-secondary))]">
                  {profile.specialite_thematique}
                </td>
                <td className="px-4 py-3 text-[rgb(var(--color-text-secondary))]">
                  {profile.style_ecriture}
                </td>
                <td className="px-4 py-3 text-[rgb(var(--color-text-secondary))]">
                  {profile.ton}
                </td>
                <td className="px-4 py-3 text-center text-[rgb(var(--color-text-secondary))]">
                  {totalContenus}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(profile.id)}
                      className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicate(profile.id)}
                      className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))]"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(profile.id)}
                      className="text-[rgb(var(--color-error))] hover:text-[rgb(var(--color-error))]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}