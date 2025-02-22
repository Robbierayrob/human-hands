'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState, useEffect } from 'react';
import ToggleButton from './ToggleButton'; // Import the ToggleButton

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

  // Use useEffect to manage starting/stopping based on sessionStarted
  useEffect(() => {
    if (sessionStarted) {
      startConversation();
    } else {
      stopConversation();
    }
  }, [sessionStarted, startConversation, stopConversation]);


  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: 'alW2fCMLhSwBA36jPYyo',
      });
      // setSessionStarted(true);  <- Moved to useEffect

    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    // setSessionStarted(false); <- Moved to useEffect
  }, [conversation]);

    const handleToggleChange = (isOn: boolean) => {
    setSessionStarted(isOn);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <ToggleButton onToggle={handleToggleChange} initialState={sessionStarted} />
      </div>

      <div className="flex items-center">
        {conversation.status === 'connected' && sessionStarted ? (
          <span className="listening-dot mr-2" title="Listening..."></span>
        ) : null}
      </div>
    </div>
  );
}
