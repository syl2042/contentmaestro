import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PROJECT_STATUSES } from '@/types/project';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  onStatusChange: (status: string | null) => void;
  onSearchChange: (query: string) => void;
}

export function ProjectFilters({ onStatusChange, onSearchChange }: ProjectFiltersProps) {
  const [activeStatus, setActiveStatus] = React.useState<string | null>(null);

  const handleStatusClick = (status: string | null) => {
    setActiveStatus(status);
    onStatusChange(status);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[rgb(var(--color-text-secondary))]" />
        </div>
        <Input
          type="text"
          placeholder="Rechercher un projet..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeStatus === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleStatusClick(null)}
          className="rounded-full"
        >
          Tous
        </Button>
        {Object.entries(PROJECT_STATUSES).map(([value, label]) => (
          <Button
            key={value}
            variant={activeStatus === value ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusClick(value)}
            className="rounded-full"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}