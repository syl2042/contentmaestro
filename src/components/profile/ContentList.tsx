import React from 'react';
import { useContenus } from '@/hooks/useContenus';
import { formatDate } from '@/utils/date';
import { FileText, Calendar, FileAudio, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTENT_STATUSES } from '@/types/contenu';

interface ContentListProps {
  profileId: string;
}

export function ContentList({ profileId }: ContentListProps) {
  const { contenus, loading, error } = useContenus(profileId);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-24 rounded-lg bg-primary/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-destructive/5 text-destructive">
        Une erreur est survenue lors du chargement des contenus
      </div>
    );
  }

  if (!contenus.length) {
    return (
      <div className="p-6 text-center rounded-lg border border-primary/10 bg-primary/5">
        <FileText className="mx-auto h-12 w-12 text-primary/40" />
        <h3 className="mt-2 text-sm font-medium text-primary/60">
          Aucun contenu généré
        </h3>
        <p className="mt-1 text-sm text-primary/40">
          Les contenus générés par ce profil apparaîtront ici
        </p>
      </div>
    );
  }

  const getContentIcon = (type: string | undefined) => {
    switch (type) {
      case 'audio':
        return FileAudio;
      case 'image':
        return Image;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-4">
      {contenus.map((contenu) => {
        const Icon = getContentIcon(contenu.type_contenu);
        
        return (
          <div
            key={contenu.id}
            className={cn(
              "p-4 rounded-lg border border-primary/10",
              "bg-gradient-to-br from-white to-primary/[0.02]",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary/60 mt-1" />
                <div className="space-y-1">
                  <h4 className="font-medium text-primary/80">{contenu.titre}</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {contenu.categorie}
                    </span>
                    {contenu.statut && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/5 text-primary/60">
                        {CONTENT_STATUSES[contenu.statut]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xs text-primary/60">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(contenu.date_creation, 'short')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}