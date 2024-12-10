import React from 'react';
import { ProfileCard } from './ProfileCard';
import { WriterProfile } from '@/types/profile';
import { cn } from '@/lib/utils';

interface ProfileListProps {
  profiles: WriterProfile[];
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProfileList({ profiles, onEdit, onDuplicate, onDelete }: ProfileListProps) {
  return (
    <div className={cn(
      "grid gap-6",
      "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      "animate-in fade-in-0 duration-500"
    )}>
      {profiles.map((profile, index) => (
        <div
          key={profile.id}
          style={{
            animationDelay: `${index * 100}ms`
          }}
          className="animate-in slide-in-from-bottom-5"
        >
          <ProfileCard
            profile={profile}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}