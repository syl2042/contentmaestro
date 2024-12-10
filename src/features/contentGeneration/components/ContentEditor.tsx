import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Save, 
  RotateCcw, 
  FileText, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import type { GeneratedContent } from '../types';
import { cn } from '@/lib/utils';

interface ContentEditorProps {
  content: GeneratedContent;
  onSave: (content: GeneratedContent) => Promise<void>;
  onRegenerate: () => Promise<void>;
  isLoading?: boolean;
}

export function ContentEditor({
  content,
  onSave,
  onRegenerate,
  isLoading = false
}: ContentEditorProps) {
  const [editedContent, setEditedContent] = React.useState(content.content);
  const [saving, setSaving] = React.useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave({
        ...content,
        content: editedContent
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{content.title}</h3>
          <div className="flex items-center gap-4 text-sm text-[rgb(var(--color-text-secondary))]">
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{content.metadata.wordCount} mots</span>
            </div>
            <div className="flex items-center gap-1">
              <span>~{content.metadata.readingTime} min de lecture</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={isLoading || saving}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Régénérer
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isLoading || saving}
          >
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className={cn(
            "w-full min-h-[400px] p-4 rounded-lg border resize-y",
            "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "font-mono text-sm leading-relaxed"
          )}
          disabled={isLoading || saving}
        />
        {(isLoading || saving) && (
          <div className="absolute inset-0 bg-[rgb(var(--color-surface))/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[rgb(var(--color-primary))] border-t-transparent" />
          </div>
        )}
      </div>

      {content.metadata.seoScore && (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-[rgb(var(--color-surface))]">
          <div className="flex items-center gap-2">
            {content.metadata.seoScore >= 80 ? (
              <CheckCircle className="h-5 w-5 text-[rgb(var(--color-success))]" />
            ) : (
              <AlertCircle className="h-5 w-5 text-[rgb(var(--color-error))]" />
            )}
            <span className="font-medium">Score SEO: {content.metadata.seoScore}%</span>
          </div>
          {content.metadata.keywords && (
            <div className="flex items-center gap-2 flex-wrap">
              {content.metadata.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 text-xs rounded-full bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}