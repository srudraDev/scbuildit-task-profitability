import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from '../components/ui';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newValue: number) => void;
  itemName: string;
  currentValue: number;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, itemName, currentValue }: ConfirmationModalProps) {
  const [value, setValue] = useState(currentValue.toString());
  
  // Update local state when the modal opens with new values
  useEffect(() => {
    if (isOpen) {
      setValue(currentValue.toString());
    }
  }, [isOpen, currentValue]);

  const handleConfirm = () => {
    onConfirm(parseInt(value) || 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Reward Value">
      <div className="p-4 rounded-lg bg-gradient-to-b from-blue-900/70 to-blue-800/70 border-2 border-blue-500">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <p className="text-white text-lg mb-2">
            You are about to modify the value of <span className="font-bold">{itemName}</span>
          </p>
          
          <p className="text-white mb-4">
            Changing reward valuations should only be done if the game has updated values.
          </p>
          
          <div className="mb-4 mx-auto max-w-xs">
            <label className="block text-white text-sm mb-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              New value (simoleons):
            </label>
            <Input
              type="number"
              value={value}
              onChange={setValue}
              className="w-full text-center"
            />
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button onClick={onClose} variant="danger" className="px-6 py-2">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="primary" className="px-6 py-2">
            Confirm Change
          </Button>
        </div>
      </div>
    </Modal>
  );
}
