import { useEffect } from 'react';

interface UseImagePreloaderProps {
  images: string[];
  priority?: number; // Number of images to preload immediately
}

export const useImagePreloader = ({ images, priority = 2 }: UseImagePreloaderProps) => {
  useEffect(() => {
    if (!images.length) return;

    // Preload priority images immediately
    const priorityImages = images.slice(0, priority);
    const laterImages = images.slice(priority);

    // Load priority images immediately
    priorityImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Load remaining images with delay to avoid blocking priority content
    const timeoutId = setTimeout(() => {
      laterImages.forEach((src, index) => {
        setTimeout(() => {
          const img = new Image();
          img.src = src;
        }, index * 200); // Stagger loading by 200ms
      });
    }, 1000); // Wait 1 second before starting background preloading

    return () => clearTimeout(timeoutId);
  }, [images, priority]);
};
