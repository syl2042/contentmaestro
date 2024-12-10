import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Puzzle } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { cn } from '@/lib/utils';

interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  icon: string;
}

const integrations: Integration[] = [
  {
    id: '1',
    name: 'WordPress',
    status: 'connected',
    icon: '🌐'
  },
  {
    id: '2',
    name: 'Réseaux Sociaux',
    status: 'disconnected',
    icon: '📱'
  }
];

export function Integrations() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <SectionHeader icon={Puzzle} title="Intégrations" />
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg",
              "bg-gradient-to-r from-muted/50 to-muted/30",
              "transition-all duration-300 hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{integration.icon}</span>
              <div>
                <p className="font-medium">{integration.name}</p>
                <p className="text-sm text-muted-foreground">
                  {integration.status === 'connected' ? 'Connecté' : 'Non connecté'}
                </p>
              </div>
            </div>
            {integration.status === 'connected' ? (
              <div className="flex items-center gap-2 text-[#2B6CB0]">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Connecté</span>
              </div>
            ) : (
              <Button size="sm" className="transition-all duration-300 hover:shadow-md">
                Connecter
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}