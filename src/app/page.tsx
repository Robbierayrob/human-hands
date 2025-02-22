"use client"


import { Tutorials } from "@/components/tutorials"
import { VantaBackground } from "@/components/VantaBackground"
import React from 'react';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] relative">
      <VantaBackground />
      <main className="relative z-10 pt-24 pb-16">
        <Tutorials id="tutorials" className="animate-fade-in-slide-up" />
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-white text-4xl font-bold mb-4">Justification</h2>
          <video width="640" height="360" controls>
            <source src="/Finding-Solutions-in-Everyday-Fixes.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
    </div>
  );
}
