"use client";

import { useState, useEffect } from 'react';

interface ToggleButtonProps {
  onToggle: (isOn: boolean) => void;
  initialState?: boolean;
}
const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle, initialState = false }) => {
  const [isOn, setIsOn] = useState(initialState);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <button
      type="button"
      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 toggle-button ${
        isOn ? 'bg-green-500' : 'bg-gray-300'
      } ${hasMounted ? 'bounce-loop' : 'bounce-once'}`}
      onClick={handleToggle}
      aria-pressed={isOn}
      title={isOn ? "Turn off conversation" : "Turn on conversation"} // Tooltip
    >
      <span
        className={`inline-block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isOn ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></span>
    </button>
  );
};

export default ToggleButton;

