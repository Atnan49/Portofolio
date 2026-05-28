'use client';

import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -500;
    let mouseY = -500;
    let currentX1 = -500;
    let currentY1 = -500;
    let currentX2 = -500;
    let currentY2 = -500;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      // Move blobs out of screen when mouse leaves
      mouseX = -500;
      mouseY = -500;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const updatePosition = () => {
      // Smooth interpolation (lerp)
      const ease1 = 0.08;
      const ease2 = 0.04;

      currentX1 += (mouseX - currentX1) * ease1;
      currentY1 += (mouseY - currentY1) * ease1;

      currentX2 += (mouseX - currentX2) * ease2;
      currentY2 += (mouseY - currentY2) * ease2;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${currentX1 - 250}px, ${currentY1 - 250}px, 0)`;
      }
      if (blob2Ref.current) {
        // Blob 2 has slight offset
        blob2Ref.current.style.transform = `translate3d(${currentX2 - 150}px, ${currentY2 - 150}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="mouse-glow-container" aria-hidden="true">
      <div ref={blob1Ref} className="mouse-glow-blob blob-1" />
      <div ref={blob2Ref} className="mouse-glow-blob blob-2" />
    </div>
  );
}
