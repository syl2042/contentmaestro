import React from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './SectionHeader';
import { formatDate } from '@/utils/date';
import type { Notification } from '@/types/notification';

interface NotificationsProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Votre contenu pour le projet XYZ est prêt.',
    type: 'info',
    date_creation: new Date().toISOString(),
    is_read: false,
  },
  {
    id: '2',
    message: 'Mise à jour du système prévue le 20 Novembre 2023.',
    type: 'warning',
    date_creation: new Date().toISOString(),
    is_read: false,
  },
];

export const Notifications = React.memo(function Notifications({ 
  notifications = mockNotifications,
  onMarkAsRead = () => {},
  onDismiss = () => {},
}: NotificationsProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <SectionHeader icon={Bell} title="Notifications" />
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start justify-between p-4 rounded-md bg-muted/50"
          >
            <div className="space-y-1">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(notification.date_creation, 'short')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                onClick={() => onMarkAsRead(notification.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                onClick={() => onDismiss(notification.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});