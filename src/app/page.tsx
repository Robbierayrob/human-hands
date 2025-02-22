"use client"


import { Tutorials } from "@/components/tutorials"
import { VantaBackground } from "@/components/VantaBackground"
import React from 'react';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] relative">
      <VantaBackground />
      <main>
        <Tutorials id="tutorials" className="animate-fade-in-slide-up pt-24" />
        <div className="flex justify-center mt-8">
          <video width="640" height="360" controls>
            <source src="/Finding-Solutions-in-Everyday Fixes.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
    </div>
  );
}
