"use client"

import { useEffect, useState, useRef } from 'react';
import { Visualizer } from 'react-sound-visualizer';

interface AudioVisualizerProps {
    audio: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audio }) => {
  const [isVisualizing, setIsVisualizing] = useState(false);

  return (
      <Visualizer audio={audio}>
        {({ canvasRef, stop, start, reset }) => (
          <div className="flex flex-col items-center">
            <canvas ref={canvasRef} width={500} height={100} className="rounded-lg border-2 border-gray-300 dark:border-gray-600" />

            <div className="mt-2 space-x-2">
              <button
                onClick={() => { start(); setIsVisualizing(true); }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                disabled={isVisualizing}
              >
                Start
              </button>
              <button
                onClick={() => { stop(); setIsVisualizing(false); }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                disabled={!isVisualizing}
              >
                Stop
              </button>
              <button
                onClick={() => { reset(); setIsVisualizing(false); }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </Visualizer>
  );
};

export default AudioVisualizer;

