import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Share2 } from 'lucide-react';
import type { GeneratedContent } from '../types';
import { cn } from '@/lib/utils';

interface ContentPreviewProps {
  content: GeneratedContent;
  onEdit: () => void;
  onExport: () => void;
  onShare: () => void;
}

export function ContentPreview({
  content,
  onEdit,
  onExport,
  onShare
}: ContentPreviewProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{content.title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Eye className="h-4 w-4 mr-2" />
            Éditer
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      <div 
        className={cn(
          "prose prose-sm max-w-none",
          "prose-headings:text-[rgb(var(--color-text-primary))]",
          "prose-p:text-[rgb(var(--color-text-secondary))]",
          "prose-strong:text-[rgb(var(--color-text-primary))]",
          "prose-a:text-[rgb(var(--color-primary))]"
        )}
        dangerouslySetInnerHTML={{ __html: content.content }}
      />

      <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--color-border))]">
        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
          Dernière modification le {new Date(content.updatedAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <span className={cn(
            "px-2 py-1 text-xs rounded-full",
            content.status === 'approved' && "bg-[rgb(var(--color-success)/0.1)] text-[rgb(var(--color-success))]",
            content.status === 'reviewing' && "bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]",
            content.status === 'draft' && "bg-[rgb(var(--color-secondary)/0.1)] text-[rgb(var(--color-text-secondary))]",
            content.status === 'rejected' && "bg-[rgb(var(--color-error)/0.1)] text-[rgb(var(--color-error))]"
          )}>
            {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
          </span>
        </div>
      </div>
    </Card>
  );
}