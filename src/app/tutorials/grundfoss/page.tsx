"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  text: string
  sender: 'user' | 'grundfoss-bot'
  timestamp: Date
}

export default function GrundfossPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hello! I'm your Grundfoss Pump System Assistant. How can I help you with pump systems today?",
    sender: 'grundfoss-bot',
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
        text: "Analyzing your query...",
        sender: 'grundfoss-bot',
        timestamp: new Date()
      }])
      
      // Mock API response with Grundfoss-specific knowledge
      const response = await new Promise(resolve => setTimeout(() => resolve({
        success: true,
        message: `For your pump system, I recommend considering:
        - Energy efficiency optimization
        - Proper system sizing
        - Maintenance schedules
        - Grundfoss-specific solutions`
      }), 1000))
      
      // Replace loading message with actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: (response as any).message,
          sender: 'grundfoss-bot',
          timestamp: new Date()
        }
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
      <h1 className="text-3xl font-bold mb-6">Grundfoss Pump System Assistant</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[600px]">
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="font-semibold">Grundfoss Pump System Chat</h3>
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
                    : 'bg-green-100 dark:bg-green-900'
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
