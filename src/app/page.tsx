"use client"

import { Hero } from "@/components/hero"
import { Tutorials } from "@/components/tutorials"
import { useState } from "react"

export default function Home() {
  const [isListening, setIsListening] = useState(false)
  const [response, setResponse] = useState("")

  const handleVoiceAssistantClick = async () => {
    setIsListening(true)
    // Mock API call
    try {
      const mockResponse = await new Promise<string>((resolve) => 
        setTimeout(() => resolve("Hello! How can I assist you today?"), 1000)
      )
      setResponse(mockResponse)
    } catch (error) {
      setResponse("Sorry, I'm having trouble connecting right now.")
    } finally {
      setIsListening(false)
    }
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
                AI Voice Assistant
              </h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Tap to activate your personal engineering assistant
              </p>
              <div className="mt-10 flex justify-center">
                <div className="relative w-32 h-32">
                  {isListening && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-32 h-32 rounded-full bg-indigo-400/20 voice-wave"></div>
                        <div className="absolute w-32 h-32 rounded-full bg-indigo-400/20 voice-wave"></div>
                        <div className="absolute w-32 h-32 rounded-full bg-indigo-400/20 voice-wave"></div>
                      </div>
                    </>
                  )}
                  <button
                    onClick={handleVoiceAssistantClick}
                    disabled={isListening}
                    className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <span className={`text-4xl ${isListening ? 'animate-pulse' : ''}`}>👐</span>
                  </button>
                </div>
              </div>
              {response && (
                <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg max-w-2xl mx-auto">
                  <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                    {response}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        <Tutorials id="tutorials" />
      </main>
    </div>
  );
}
