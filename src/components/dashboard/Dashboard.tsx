import React from 'react';
import { WelcomeHeader } from './WelcomeHeader';
import { StatsSection } from './StatsSection';
import { QuickActions } from './QuickActions';
import { RecentProjects } from './RecentProjects';
import { ContentDistribution } from './ContentDistribution';
import { Notifications } from './Notifications';
import { Integrations } from './Integrations';
import { UpcomingTasks } from './UpcomingTasks';

export function Dashboard() {
  return (
    <div className="space-y-12 animate-in">
      <WelcomeHeader />
      <QuickActions />
      
      <section className="space-y-8">
        <StatsSection />
      </section>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <section className="transition-all duration-200 hover:translate-y-[-2px]">
            <RecentProjects />
          </section>
          <section className="transition-all duration-200 hover:translate-y-[-2px]">
            <ContentDistribution />
          </section>
        </div>
        <div className="space-y-8">
          <section className="transition-all duration-200 hover:translate-y-[-2px]">
            <Notifications />
          </section>
          <section className="transition-all duration-200 hover:translate-y-[-2px]">
            <UpcomingTasks />
          </section>
          <section className="transition-all duration-200 hover:translate-y-[-2px]">
            <Integrations />
          </section>
        </div>
      </div>
    </div>
  );
}