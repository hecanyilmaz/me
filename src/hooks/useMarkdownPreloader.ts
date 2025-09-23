import { useEffect } from 'react';

interface UseMarkdownPreloaderProps {
  markdownFiles: string[];
  priority?: number; // Number of articles to preload immediately
}

// Simple in-memory cache for markdown content (shared with MarkdownViewer)
const markdownCache = new Map<string, string>();

export const useMarkdownPreloader = ({ markdownFiles, priority = 1 }: UseMarkdownPreloaderProps) => {
  useEffect(() => {
    if (!markdownFiles.length) return;

    const preloadMarkdown = async (filename: string) => {
      // Skip if already cached
      if (markdownCache.has(filename)) return;

      try {
        const publicUrl = process.env.PUBLIC_URL || '';
        const basePath = publicUrl || (process.env.NODE_ENV === 'production' ? '/me' : '');
        const fetchUrl = `${basePath}/articles/${filename}`;
        
        const response = await fetch(fetchUrl);
        if (response.ok) {
          const content = await response.text();
          markdownCache.set(filename, content);
        }
      } catch (error) {
        console.warn(`Failed to preload article: ${filename}`, error);
      }
    };

    // Preload priority articles immediately
    const priorityFiles = markdownFiles.slice(0, priority);
    const laterFiles = markdownFiles.slice(priority);

    // Load priority articles immediately
    priorityFiles.forEach(preloadMarkdown);

    // Load remaining articles with delay to avoid blocking
    const timeoutId = setTimeout(() => {
      laterFiles.forEach((filename, index) => {
        setTimeout(() => {
          preloadMarkdown(filename);
        }, index * 500); // Stagger loading by 500ms
      });
    }, 1500); // Wait 1.5 seconds before starting background preloading

    return () => clearTimeout(timeoutId);
  }, [markdownFiles, priority]);
};

// Export cache for MarkdownViewer to use
export { markdownCache };
