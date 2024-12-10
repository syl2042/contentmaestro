import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  Puzzle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de Bord', href: '/' },
  { icon: FolderKanban, label: 'Projets', href: '/projects' },
  { icon: Users, label: 'Profils de Rédacteurs', href: '/profiles' },
  { icon: Puzzle, label: 'Intégrations', href: '/integrations' },
  { icon: Settings, label: 'Paramètres', href: '/settings' },
  { icon: HelpCircle, label: 'Aide', href: '/help' },
];

export function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform lg:static",
        !open && "-translate-x-full lg:translate-x-0"
      )}
    >
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3",
              location.pathname === item.href && "bg-[#2B6CB0]/10 text-[#2B6CB0]"
            )}
            onClick={() => navigate(item.href)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}