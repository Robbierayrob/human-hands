"use client"

import { useEffect, useRef } from 'react';
import { useVisualizer } from 'react-sound-visualizer';

interface AudioVisualizerProps {
    audio: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audio }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { start, stop } = useVisualizer(audio, canvasRef.current, { strokeColor: "blue" });

  useEffect(() => {
    if (start && stop) { // Check if start and stop are defined
      start();

      return () => {
        stop();
      };
    }
  }, [audio, start, stop]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={500} height={100} className="rounded-lg border-2 border-gray-300 dark:border-gray-600" />
    </div>
  );
};

export default AudioVisualizer;
