import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';

interface Task {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'deadline' | 'webinar';
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Réunion équipe marketing',
    date: '2024-02-22T14:00:00',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Date limite - Articles Blog Tech',
    date: '2024-02-23T18:00:00',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Webinaire SEO Avancé',
    date: '2024-02-24T10:00:00',
    type: 'webinar'
  }
];

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--color-primary)/0.1)]">
          <Calendar className="h-5 w-5 text-[rgb(var(--color-primary))]" />
          <h2 className="text-lg font-semibold text-[rgb(var(--color-primary))]">
            Tâches à Venir
          </h2>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start justify-between p-4 rounded-md bg-[rgb(var(--color-primary)/0.1)]"
          >
            <div className="space-y-1">
              <p className="font-medium text-[rgb(var(--color-text-primary))]">{task.title}</p>
              <div className="flex items-center gap-1 text-sm text-[rgb(var(--color-text-secondary))]">
                <Clock className="h-4 w-4" />
                <span>
                  {new Date(task.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}