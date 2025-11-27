// Direct imports of markdown files
import buildingScalableReactApps from './building-scalable-react-apps.md';
import reliableMaintainableScalableSystems from './reliable-maintainable-scalable-systems.md';

export const markdownFiles: Record<string, string> = {
  'building-scalable-react-apps.md': buildingScalableReactApps,
  'reliable-maintainable-scalable-systems.md': reliableMaintainableScalableSystems,
};

export const getMarkdownContent = (filename: string): string | null => {
  return markdownFiles[filename] || null;
};
