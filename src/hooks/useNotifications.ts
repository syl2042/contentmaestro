import { useState, useEffect } from 'react';
import { getNotifications } from '@/lib/api/supabase-queries';

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getNotifications(userId);
        setNotifications(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [userId]);

  return { notifications, loading, error };
}