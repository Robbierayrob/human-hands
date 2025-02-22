import React from 'react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">AI Agent Guidelines</h2>
        <p className="mb-4">
          Here are some example questions you can ask:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>"Show me the tools."</li>
          <li>"What are the replacement parts?"</li>
          <li>"How do I assemble the drive shaft?"</li>
          <li>"Clear media."</li>
        </ul>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GuidelinesModal;
