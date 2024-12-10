import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  TooltipProvider, 
  TooltipRoot, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-16 border-b bg-[rgb(var(--color-surface))] backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--color-surface))/60]">
      <div className="flex h-full items-center px-4 sm:px-6">
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Menu principal</TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
        
        <div className="ml-4 flex items-center">
          <img src="/logo.svg" alt="ContentMaestro" className="h-8 w-8" />
          <span className="ml-2 text-xl font-semibold">ContentMaestro</span>
        </div>

        <div className="ml-auto flex items-center gap-2 pr-4">
          <ThemeToggle />
          
          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </TooltipRoot>
          </TooltipProvider>

          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mon compte</TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}