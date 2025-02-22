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
        <section className="w-full py-12 animate-fade-in-slide-up">
          <div className="container px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up relative z-10">
              Can we fix it? Yes we can!
            </h1>
          </div>
        </section>
        <Tutorials id="tutorials" className="animate-fade-in-slide-up" />
      </main>
    </div>
  );
}
