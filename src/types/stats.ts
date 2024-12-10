import { LucideIcon } from 'lucide-react';

export interface DashboardStats {
  activeProjects: number;
  generatedContent: number;
  activeProfiles: number;
  satisfaction: number;
}

export interface StatsCardConfig {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  variant: 'projects' | 'content' | 'profiles' | 'satisfaction';
}