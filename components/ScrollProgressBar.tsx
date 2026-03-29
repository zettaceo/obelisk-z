'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = (): void => {
      const fill = fillRef.current;
      const track = trackRef.current;
      if (!fill || !track) return;

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      fill.style.transform = `scaleX(${progress})`;
      track.style.opacity = progress > 0 ? '1' : '0.35';
    };

    const onScrollOrResize = (): void => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true" ref={trackRef}>
      <div className="scroll-progress__fill" ref={fillRef} />
    </div>
  );
}
