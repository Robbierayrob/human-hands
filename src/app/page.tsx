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
      </main>
    </div>
  );
}
