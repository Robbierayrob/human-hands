'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';

interface ElevenLabsConversationProps {
  onAiMessage: (text: string) => void;
  onUserMessage: (text: string) => void;
}

export function ElevenLabsConversation({ onAiMessage, onUserMessage }: ElevenLabsConversationProps) {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => {
      console.log('Message:', message);
      if (message.source === 'ai') {
        onAiMessage(message.message);
      } else if (message.source === 'user') {
        onUserMessage(message.message);
      }
    },
    onError: (error) => console.error('Error:', error),
  });

  const [sessionStarted, setSessionStarted] = useState(false); // Track session start

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: 'alW2fCMLhSwBA36jPYyo',
      });
      setSessionStarted(true); // Set sessionStarted to true

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setSessionStarted(false); // Reset sessionStarted on stop
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex items-center">
        {conversation.status === 'connected' && sessionStarted ? (
          <span className="listening-dot mr-2" title="Listening..."></span>
        ) : null}
      </div>
    </div>
  );
}
