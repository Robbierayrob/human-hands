"use client"

import { Visualizer } from 'react-sound-visualizer';

interface AudioVisualizerProps {
    audio: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audio }) => {
  return (
      <Visualizer audio={audio}>
        {({ canvasRef }) => (
          <div className="flex flex-col items-center">
            <canvas ref={canvasRef} width={500} height={100} className="rounded-lg border-2 border-gray-300 dark:border-gray-600" />
          </div>
        )}
      </Visualizer>
  );
};

export default AudioVisualizer;
