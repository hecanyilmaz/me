import { useState, useEffect, RefObject } from 'react';

interface UseReadingProgressProps {
  contentRef: RefObject<HTMLElement>;
}

export const useReadingProgress = ({ contentRef }: UseReadingProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate how much of the element has been scrolled past
      const scrolled = scrollTop + viewportHeight - elementTop;
      const total = elementHeight + viewportHeight;
      
      const progressPercentage = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgress(progressPercentage);
    };

    // Initial calculation
    updateProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [contentRef]);

  return progress;
};
