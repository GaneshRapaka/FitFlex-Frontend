import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackgroundGrid
 * Renders a crisp architectural grid background that dynamically
 * illuminates and tracks mouse movement with a hardware-accelerated spotlight.
 * Pure GPU/CSS-variable execution with zero React re-renders.
 */
const InteractiveBackgroundGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    let targetX = null;
    let targetY = null;
    let isInside = true;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isInside = true;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty('--mouse-x', `${targetX}px`);
            containerRef.current.style.setProperty('--mouse-y', `${targetY}px`);
            containerRef.current.style.setProperty('--spotlight-opacity', isInside ? '1' : '0');
          }
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--spotlight-opacity', '0');
      }
    };

    const handleMouseEnter = () => {
      isInside = true;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--spotlight-opacity', '1');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '280px',
        '--spotlight-opacity': '1',
      }}
      aria-hidden="true"
    >
      {/* 1. Base Crisp Architectural Grid */}
      <div className="absolute inset-0 bg-grid-architectural" />

      {/* 2. Ambient Soft Spotlight Glow (athletic terracotta & carbon halo) */}
      <div 
        className="absolute inset-0 bg-grid-glow transition-opacity duration-500 ease-out"
        style={{ opacity: 'var(--spotlight-opacity, 1)' }}
      />

      {/* 3. Intensified Spotlight Grid Reveal */}
      <div
        className="absolute inset-0 bg-grid-spotlight transition-opacity duration-300 ease-out"
        style={{ opacity: 'var(--spotlight-opacity, 1)' }}
      />
    </div>
  );
};

export default InteractiveBackgroundGrid;
