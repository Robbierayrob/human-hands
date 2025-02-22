"use client"

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/src/vanta.halo';

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const vantaEffect = HALO({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      xOffset: 0.15
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};
