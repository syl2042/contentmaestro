import { useState, useEffect } from 'react';
import { getProjectDetails } from '@/lib/api/projects';
import type { Project } from '@/types/project';

export function useProjectDetails(projectId: string | undefined, userId: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!projectId || !userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getProjectDetails(projectId);
        setProject(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch project details:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch project details'));
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId, userId]);

  return { project, loading, error };
}