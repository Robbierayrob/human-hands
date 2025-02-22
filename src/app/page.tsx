"use client"

import { Hero } from "@/components/hero"
import { Tutorials } from "@/components/tutorials"
import { VantaBackground } from "@/components/VantaBackground"
import React, { useState } from 'react';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    // Remove the animation class after it completes (0.5s in this case)
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)] relative">
      <VantaBackground />
      <main>
        <Tutorials id="tutorials" className="animate-fade-in-slide-up pt-24" />
      </main>
    </div>
  );
}
