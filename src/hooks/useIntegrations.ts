import { useState, useEffect } from 'react';
import { getIntegrations } from '@/lib/api/supabase-queries';

export function useIntegrations(userId: string) {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchIntegrations() {
      try {
        const data = await getIntegrations(userId);
        setIntegrations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch integrations'));
      } finally {
        setLoading(false);
      }
    }

    fetchIntegrations();
  }, [userId]);

  return { integrations, loading, error };
}