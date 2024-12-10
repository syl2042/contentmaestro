export interface ContentGenerationConfig {
  profileId: string;
  projectId: string;
  contentType: string;
  parameters: {
    tone: string;
    style: string;
    length: number;
    keywords: string[];
    targetAudience: string;
    seoOptimization: boolean;
  };
}

export interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  metadata: {
    wordCount: number;
    readingTime: number;
    seoScore?: number;
    keywords?: string[];
  };
  status: 'draft' | 'reviewing' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  structure: {
    sections: Array<{
      type: 'introduction' | 'body' | 'conclusion' | 'custom';
      title?: string;
      guidelines?: string;
    }>;
    requirements?: {
      minWords?: number;
      maxWords?: number;
      mandatorySections?: string[];
    };
  };
}