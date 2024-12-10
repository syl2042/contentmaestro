import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
              >
                <Sun 
                  className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" 
                  aria-hidden="true"
                />
                <Moon 
                  className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" 
                  aria-hidden="true"
                />
                <span className="sr-only">Changer le thème</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Changer le thème</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
      
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          aria-selected={theme === 'light'}
        >
          <Sun className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Thème clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          aria-selected={theme === 'dark'}
        >
          <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Thème sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          aria-selected={theme === 'system'}
        >
          <Monitor className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Thème système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}