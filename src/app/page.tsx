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
        <section className="w-full py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
                AI Voice Assistant
              </h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Click to activate your personal engineering assistant
              </p>
              <div className="mt-6">
                <button
                  onClick={handleVoiceAssistantClick}
                  disabled={isListening}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isListening ? (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                      Listening...
                    </div>
                  ) : (
                    "Start Voice Assistant"
                  )}
                </button>
                {response && (
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">{response}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Tutorials id="tutorials" />
      </main>
    </div>
  );
}
