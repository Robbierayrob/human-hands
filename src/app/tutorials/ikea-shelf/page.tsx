"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface Message {
  text: string
  sender: 'user' | 'ikea-bot'
  timestamp: Date
}

export default function IkeaShelfPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi! I'm your IKEA Shelf Assistant. How can I help you with your shelf design today?",
    sender: 'ikea-bot',
    timestamp: new Date()
  }])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
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
        text: "Let me think about that...",
        sender: 'ikea-bot',
        timestamp: new Date()
      }])
      
      // Mock API call
      console.log("Mock API Request:", {
        endpoint: "/api/ikea-chat",
        method: "POST",
        body: {
          message: message,
          context: messages
        }
      })

      // Mock API response with IKEA-specific knowledge
      const response = await new Promise(resolve => setTimeout(() => {
        const mockResponse = {
          success: true,
          message: `For your shelf design, I recommend considering:
          - Standard IKEA shelf dimensions
          - Weight capacity based on your needs
          - Material options available at IKEA
          - Wall mounting solutions`
        }
        console.log("Mock API Response:", mockResponse)
        resolve(mockResponse)
      }, 1000))
      
      // Replace loading message with actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: (response as any).message,
          sender: 'ikea-bot',
          timestamp: new Date()
        }
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: "Oops! I'm having trouble accessing IKEA's product database. Please try again later.",
          sender: 'ikea-bot',
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
        <h1 className="text-3xl font-bold">IKEA Shelf Assistant</h1>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[600px]">
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="font-semibold">IKEA Shelf Design Chat</h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
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
                    : 'bg-blue-100 dark:bg-blue-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
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
              placeholder="Ask me about shelf design, materials, or installation..."
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
