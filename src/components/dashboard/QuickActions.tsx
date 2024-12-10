import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, UserPlus } from 'lucide-react';
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog';

export function QuickActions() {
  const navigate = useNavigate();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button 
          className="gap-2 shadow-lg shadow-[rgb(var(--color-primary))/20 hover:shadow-xl hover:shadow-[rgb(var(--color-primary))/30 hover:scale-105 transition-all duration-300"
          onClick={() => setIsCreateProjectOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Nouveau Projet
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 hover:bg-[rgb(var(--color-primary))/10 hover:text-[rgb(var(--color-primary))] transition-all duration-300"
          onClick={() => navigate('/profiles')}
        >
          <UserPlus className="h-4 w-4" />
          Nouveau Profil
        </Button>
      </div>

      <CreateProjectDialog
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />
    </>
  );
}