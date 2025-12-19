export interface Article {
  id: number;
  title: string;
  summary: string;
  date: string;
  markdownFile: string;
  tags: string[];
  originalSource?: {
    title: string;
    url: string;
  };
}

