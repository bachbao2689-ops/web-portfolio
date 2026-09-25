'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FollowMascot({ anchorX = 0 }: { anchorX?: number }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 700);
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 2 - 1, 
        y: (e.clientY / window.innerHeight) * 2 - 1 
      });
    };
    window.addEventListener('mousemove', handleMouse);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  // Base direction (looks towards content)
  const lookRight = anchorX < 200 || (!isMobile && anchorX < 500);
  const baseOffset = lookRight ? 1.5 : -1.5;
  
  // Interactive offset (eyes follow cursor)
  // Max movement is 2px to keep pupils inside the eye white
  const pupilX = baseOffset + (mousePos.x * 2.5);
  const pupilY = mousePos.y * 2.5;

  return (
    <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', display: 'block' }}>
      <g>
        <path fill="#2d2519" d="M51.41,82.21l41.84,4.11c21.16,1.93,24.28-9.94,25.02-17.39,1.13-11.46-8.57-21.44-19.64-28.09-27.57-16.24-46.73,10.44-47.22,41.37Z"/>
        <path fill="#2d2519" d="M31.68,34.66c-9.63-2.81-26.65-1.26-29.84,11.2-1.42,5.81,4.14,25.96,41.28,34.71l5.38,1.31c4.8-24.7.12-42.17-16.82-47.23Z"/>
        
        {/* Left Eye */}
        <circle fill="#fff" cx="37.35" cy="68.76" r="7.58"/>
        <motion.circle fill="#0c192b" cx="37.11" cy="70.89" r="2.81" animate={{ x: pupilX, y: pupilY }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} />
        
        {/* Right Eye */}
        <circle fill="#fff" cx="68.7" cy="73.23" r="7.58"/>
        <motion.circle fill="#0c192b" cx="67.46" cy="75.24" r="2.81" animate={{ x: pupilX, y: pupilY }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} />
      </g>
    </svg>
  );
}
