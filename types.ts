export interface StickerStyle {
  id: string;
  name: string;
  promptSuffix: string;
}

export interface Expression {
  id: string;
  name: string; // Traditional Chinese
  enName: string; // English for prompt
  defaultChecked?: boolean;
}

export interface GeneratedImage {
  id: string;
  expressionName: string;
  originalImageBlob: Blob; // The 370x320 transparent PNG
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  // Grouping fields
  batchId: string;
  batchName: string; // User defined name for the pack
  styleName: string;
  createdAt: number;
  downloadOptions: {
    includeMain: boolean; // 240x240
    includeTab: boolean; // 96x74
  };
}

export interface GenerationConfig {
  styleId: string;
  selectedExpressions: string[]; // IDs
  customExpressions: string[]; // Raw text
  theme: string;
}

export interface StickerPackInfo {
  id: string;
  name: string;
  createdAt: number;
}