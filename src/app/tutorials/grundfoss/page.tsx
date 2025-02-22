"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ElevenLabsConversation } from "@/components/eleven-labs"

interface Message {
  text: string
  sender: 'user' | 'grundfoss-bot'
  timestamp: Date
  type?: 'text' | 'image' | 'video'
  url?: string
  startTime?: number
  duration?: number
}

export default function GrundfossPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Initialize with welcome message only on client side
    setMessages([{
      text: "Hello! I'm your Grundfoss Pump System Assistant. How can I help you with pump systems today?",
      sender: 'grundfoss-bot',
      timestamp: new Date()
    }])
  }, [])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"  // Ensure the entire block is visible
    })
  }

  useEffect(() => {
    // Add a small delay to ensure media is loaded before scrolling
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [messages])

  const handleSend = async () => {
    if (message.trim() === "") return
    
    // Add user message
    const userMessage: Message = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    try {
      // Add loading state
      setMessages(prev => [...prev, {
        text: "Analyzing your query...",
        sender: 'grundfoss-bot',
        timestamp: new Date()
      }])
      
      // Real API call to Flask server
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: messages
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      // Replace loading message with actual response
      const newMessage = {
        text: data.response,
        sender: 'grundfoss-bot',
        timestamp: new Date(),
        type: data.media?.[0]?.type || 'text',
        url: data.media?.[0]?.url,
        startTime: data.media?.[0]?.start_time,
        duration: data.media?.[0]?.duration
      }
      setMessages(prev => [
        ...prev.slice(0, -1),
        newMessage
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: "Sorry, I'm experiencing technical difficulties. Please try again later.",
          sender: 'grundfoss-bot',
          timestamp: new Date()
        }
      ])
      console.error("Error sending message:", error)
    }
    
    setMessage("")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Grundfoss Pump System Assistant</h1>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>
      <div className="space-y-4">
        <ElevenLabsConversation />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[calc(100vh-300px)] min-h-[500px] max-h-[700px]">
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="font-semibold">Grundfoss Pump System Chat</h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-green-100 dark:bg-green-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                {msg.type === 'image' && msg.url && (
                  <div className="mt-2">
                    <img 
                      src={msg.url} 
                      alt="Response image" 
                      className="max-w-full max-h-[400px] object-contain rounded-lg"
                      onLoad={scrollToBottom}  // Scroll when image loads
                    />
                  </div>
                )}
                {msg.type === 'video' && msg.url && (
                  <div className="mt-2">
                    <iframe
                      width="100%"
                      height="315"
                      src={`${msg.url.replace('watch?v=', 'embed/')}?autoplay=1&start=${msg.startTime || 0}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg w-full aspect-video"
                    />
                    {msg.duration && (
                      <div className="text-xs text-gray-500 mt-1">
                        Video will stop after {msg.duration} seconds
                      </div>
                    )}
                  </div>
                )}
                <span className="text-xs opacity-50 block mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex flex-col space-y-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask me about pump systems, optimization, or maintenance..."
              className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              rows={3}
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
