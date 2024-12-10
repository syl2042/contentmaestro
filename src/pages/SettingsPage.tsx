import React from 'react';
import { Settings, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const themes = [
  {
    id: 'light',
    name: 'Clair',
    icon: Sun,
    description: 'Thème clair pour une meilleure lisibilité en journée'
  },
  {
    id: 'dark',
    name: 'Sombre',
    icon: Moon,
    description: 'Thème sombre pour réduire la fatigue oculaire'
  },
  {
    id: 'system',
    name: 'Système',
    icon: Monitor,
    description: 'Suit automatiquement les préférences de votre système'
  }
] as const;

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-[rgb(var(--color-primary))] animate-pulse" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary)/0.7)] bg-clip-text text-transparent">
          Paramètres
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Thème</Label>
              <div className="grid gap-4 mt-3 md:grid-cols-3">
                {themes.map(({ id, name, icon: Icon, description }) => (
                  <button
                    key={id}
                    onClick={() => setTheme(id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-lg border p-4 text-center",
                      "transition-all duration-200",
                      theme === id ? [
                        "border-[rgb(var(--color-primary))]",
                        "bg-[rgb(var(--color-primary)/0.1)]",
                        "text-[rgb(var(--color-primary))]"
                      ] : [
                        "border-[rgb(var(--color-border))]",
                        "hover:border-[rgb(var(--color-primary))]",
                        "hover:bg-[rgb(var(--color-primary)/0.05)]"
                      ]
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-xs text-[rgb(var(--color-text-secondary))]">
                        {description}
                      </div>
                    </div>
                    {theme === id && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[rgb(var(--color-primary))]">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}