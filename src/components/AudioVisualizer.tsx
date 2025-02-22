"use client"

import { useEffect } from 'react';
import { Visualizer } from 'react-sound-visualizer';

interface AudioVisualizerProps {
    audio: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audio }) => {
  return (
      <Visualizer audio={audio} strokeColor="blue">
        {({ canvasRef, start, stop }) => {  // Destructure start and stop
          useEffect(() => {
            if (audio) {
              start(); // Start visualization when audio is available

              return () => {
                stop(); // Stop visualization on unmount or audio change
              };
            }
          }, [audio, start, stop]); // Depend on audio, start, and stop

          return (
            <div className="flex flex-col items-center">
              <canvas ref={canvasRef} width={500} height={100} className="rounded-lg border-2 border-gray-300 dark:border-gray-600" />
            </div>
          );
        }}
      </Visualizer>
  );
};

export default AudioVisualizer;
