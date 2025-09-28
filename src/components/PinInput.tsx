import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PinInputProps {
  onSubmit: (pin: string) => void;
  onBack: () => void;
}

const PinInput: React.FC<PinInputProps> = ({ onSubmit, onBack }) => {
  const [pin, setPin] = useState('');

  const handleNumberPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      
      // Auto submit when 6 digits are entered
      if (newPin.length === 6) {
        setTimeout(() => onSubmit(newPin), 300);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleOk = () => {
    if (pin.length === 6) {
      onSubmit(pin);
    }
  };

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace']
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col pt-10">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="ml-4 text-lg font-semibold text-gray-900">Sale</h1>
      </div>

      {/* PIN display */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-8">Enter PIN</h2>
          <div className="flex justify-center space-x-3 mb-12">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  index < pin.length 
                    ? 'bg-gray-900 border-gray-900' 
                    : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {numbers.flat().map((key, index) => (
            <button
              key={index}
              onClick={() => {
                if (key === 'backspace') {
                  handleBackspace();
                } else if (key !== '') {
                  handleNumberPress(key);
                }
              }}
              disabled={key === ''}
              className="h-16 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-xl font-medium text-gray-900 disabled:bg-transparent"
            >
              {key === 'backspace' ? '⌫' : key}
            </button>
          ))}
        </div>

        {/* OK button */}
        <button
          onClick={handleOk}
          disabled={pin.length < 6}
          className="w-full bg-gray-900 text-white p-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PinInput;