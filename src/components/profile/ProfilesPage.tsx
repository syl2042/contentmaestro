import React, { useState } from 'react';
import { Sparkles, Search, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProfileList } from './ProfileList';
import { ProfileTable } from './ProfileTable';
import { ProfileWizard } from './ProfileWizard';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { useProfiles } from '@/hooks/useProfiles';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  TooltipProvider, 
  TooltipRoot, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';
import type { WriterProfile } from '@/types/profile';

export function ProfilesPage() {
  const { user } = useAuth();
  const { profiles, loading, error, deleteProfile, refreshProfiles } = useProfiles(user?.id);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<WriterProfile | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredProfiles = profiles.filter(profile =>
    profile.nom_profil.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.specialite_thematique.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProfileCreated = () => {
    refreshProfiles();
  };

  const handleEdit = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setIsWizardOpen(true);
    }
  };

  const handleDuplicate = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      const duplicatedProfile = {
        ...profile,
        id: crypto.randomUUID(),
        nom_profil: `${profile.nom_profil} (copie)`,
      };
      setSelectedProfile(duplicatedProfile);
      setIsWizardOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedProfile) {
      await deleteProfile(selectedProfile.id);
      setIsDeleteDialogOpen(false);
      setSelectedProfile(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-[rgb(var(--color-primary))] animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary)/0.7)] bg-clip-text text-transparent">
              Profils de Rédacteurs
            </h1>
          </div>
          <p className="text-base text-[rgb(var(--color-text-secondary))]">
            Créez et gérez vos profils de rédacteurs pour personnaliser la génération de contenu
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex rounded-lg border border-[rgb(var(--color-border))] p-1">
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "px-3",
                      viewMode === 'grid' && "bg-[rgb(var(--color-primary)/0.1)]"
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
                      viewMode === 'table' && "bg-[rgb(var(--color-primary)/0.1)]"
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
            onClick={() => setIsWizardOpen(true)} 
            className={cn(
              "gap-2 shadow-lg shadow-[rgb(var(--color-primary)/0.2)]",
              "bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary)/0.9)]",
              "hover:shadow-xl hover:shadow-[rgb(var(--color-primary)/0.3)]",
              "transition-all duration-300 hover:scale-105",
              "rounded-xl"
            )}
          >
            + Nouveau Profil
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[rgb(var(--color-text-secondary))]" />
        </div>
        <Input
          type="text"
          placeholder="Rechercher un profil..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12"
        />
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 rounded-xl bg-[rgb(var(--color-surface))] animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl bg-[rgb(var(--color-error)/0.1)] text-[rgb(var(--color-error))]">
          <p className="font-medium">Une erreur est survenue</p>
          <p className="text-sm mt-1 text-[rgb(var(--color-error)/0.8)]">{error.message}</p>
        </div>
      ) : viewMode === 'grid' ? (
        <ProfileList
          profiles={filteredProfiles}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      ) : (
        <ProfileTable
          profiles={filteredProfiles}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      )}

      <ProfileWizard
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          setSelectedProfile(null);
        }}
        profile={selectedProfile}
        onProfileCreated={handleProfileCreated}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProfile(null);
        }}
        onConfirm={confirmDelete}
        profileName={selectedProfile?.nom_profil || ''}
      />
    </div>
  );
}