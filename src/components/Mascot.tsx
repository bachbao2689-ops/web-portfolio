'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProjectGlyph from './ProjectGlyph';
import { useMotionPreference } from './MotionPreference';

export default function Mascot({ variant, className = "" }: { variant: number, className?: string }) {
  const { reduced } = useMotionPreference();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth eye tracking
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const eyeX = useSpring(mouseX, springConfig);
  const eyeY = useSpring(mouseY, springConfig);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate center of the mascot
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate offset from center (-1 to 1 roughly)
      const maxOffset = 30; // Max pixels the eyes can move
      
      // Simple clamped vector
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedDistance = Math.min(distance / 200, 1); // Max eye pull at 200px distance
      
      const angle = Math.atan2(dy, dx);
      
      mouseX.set(Math.cos(angle) * normalizedDistance * maxOffset);
      mouseY.set(Math.sin(angle) * normalizedDistance * maxOffset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduced, mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`relative inline-flex items-center justify-center ${className}`}>
      <ProjectGlyph variant={variant} className="w-full h-full relative z-0" />
      
      {/* Eyes Container */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center gap-2"
        style={{ x: eyeX, y: eyeY }}
        aria-hidden="true"
      >
        {/* Left Eye */}
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="w-2 h-2 bg-slate-900 rounded-full" />
        </div>
        
        {/* Right Eye */}
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
