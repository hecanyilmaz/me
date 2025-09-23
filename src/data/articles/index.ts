// Direct imports of markdown files
import buildingScalableReactApps from './building-scalable-react-apps.md';

export const markdownFiles: Record<string, string> = {
  'building-scalable-react-apps.md': buildingScalableReactApps,
};

export const getMarkdownContent = (filename: string): string | null => {
  return markdownFiles[filename] || null;
};
