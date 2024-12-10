import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useContenusStats } from '@/hooks/useContenus';
import { useAuth } from '@/contexts/AuthContext';
import { PROJECT_STATUSES } from '@/types/project';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const COLORS = [
  'rgb(var(--color-primary))',     // Primary
  'rgb(var(--color-success))',     // Success
  'rgb(var(--color-accent))',      // Accent
  'rgb(var(--color-error))',       // Error
  'rgb(var(--color-secondary))',   // Secondary
];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="rgb(var(--color-text-primary))"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ContentDistribution() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { categoriesData, loading, error } = useContenusStats(user?.id, selectedStatus);

  const renderStatusFilter = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => setSelectedStatus(null)}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
          "border border-[rgb(var(--color-border))]",
          selectedStatus === null
            ? "bg-[rgb(var(--color-primary))] text-white border-transparent"
            : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-primary)/0.1)] hover:text-[rgb(var(--color-primary))]"
        )}
      >
        Tous
      </button>
      {Object.entries(PROJECT_STATUSES).map(([value, label]) => (
        <button
          key={value}
          onClick={() => setSelectedStatus(value)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
            "border border-[rgb(var(--color-border))]",
            selectedStatus === value
              ? "bg-[rgb(var(--color-primary))] text-white border-transparent"
              : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-primary)/0.1)] hover:text-[rgb(var(--color-primary))]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution des Contenus par Catégorie</CardTitle>
      </CardHeader>
      <CardContent>
        {renderStatusFilter()}
        
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[rgb(var(--color-primary)/0.2)] border-t-[rgb(var(--color-primary))] animate-spin" />
          </div>
        ) : error ? (
          <div className="p-4 rounded-lg bg-[rgb(var(--color-error)/0.1)] text-[rgb(var(--color-error))]">
            Une erreur est survenue lors du chargement des statistiques
          </div>
        ) : !categoriesData?.length ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-[rgb(var(--color-text-secondary))]">
                Aucun contenu généré
              </h3>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
                Les statistiques apparaîtront ici une fois que vous aurez généré du contenu
              </p>
            </div>
          </div>
        ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriesData}
                  dataKey="count"
                  nameKey="categorie"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={140}
                  fill="rgb(var(--color-primary))"
                  labelLine={false}
                  label={CustomLabel}
                >
                  {categoriesData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} contenu${value > 1 ? 's' : ''}`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgb(var(--color-surface))',
                    borderRadius: '8px',
                    border: '1px solid rgb(var(--color-border))',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    padding: '8px 12px',
                    color: 'rgb(var(--color-text-primary))'
                  }}
                  itemStyle={{
                    color: 'rgb(var(--color-text-primary))'
                  }}
                  labelStyle={{
                    color: 'rgb(var(--color-text-primary))'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-[rgb(var(--color-text-secondary))]">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}