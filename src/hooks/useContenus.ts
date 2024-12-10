import { useState, useEffect } from 'react';
import { getContenusParProfil, getContenusStats, getContenusParCategorie } from '@/lib/api/contenus';
import type { Contenu } from '@/types/contenu';

export function useContenus(profilId?: string) {
  const [contenus, setContenus] = useState<Contenu[]>([]);
  const [totalContenus, setTotalContenus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!profilId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [contenusData, statsData] = await Promise.all([
          getContenusParProfil(profilId),
          getContenusStats(profilId)
        ]);
        
        setContenus(contenusData);
        setTotalContenus(statsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch contenus'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [profilId]);

  return {
    contenus,
    totalContenus,
    loading,
    error
  };
}

export function useContenusStats(userId?: string, projectStatus?: string | null) {
  const [categoriesData, setCategoriesData] = useState<{ categorie: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getContenusParCategorie(userId, projectStatus);
        setCategoriesData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch contenus stats'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, projectStatus]);

  return {
    categoriesData,
    loading,
    error
  };
}