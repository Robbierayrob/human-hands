"use client"

import { Hero } from "@/components/hero"
import { Tutorials } from "@/components/tutorials"
import React, { useState } from 'react';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    // Remove the animation class after it completes (0.5s in this case)
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="mt-10 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 animate-fade-in-up">
                  Can we fix it? Yes we can!
                </h1>
                <div className="relative w-32 h-32">
                  <button
                    className={`absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-80 disabled:cursor-not-allowed ${isAnimating ? 'animate-wave' : ''}`}
                    onClick={handleClick}
                  >
                    <span className={`text-4xl`}>👐</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Tutorials id="tutorials" />
      </main>
    </div>
  );
}
