import React, { useState } from 'react';
import { ArrowLeft, Delete } from 'lucide-react';

interface AmountInputProps {
  onNext: (amount: string) => void;
  onBack: () => void;
  initialAmount: string;
}

const AmountInput: React.FC<AmountInputProps> = ({ onNext, onBack, initialAmount }) => {
  const [amount, setAmount] = useState(initialAmount);

  const handleNumberPress = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleTakePayment = () => {
    if (amount !== '0') {
      onNext(amount);
    }
  };

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', '00', 'backspace']
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

      {/* Amount display */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl font-light text-gray-900 mb-2">
            {amount} ₹
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
                } else {
                  handleNumberPress(key);
                }
              }}
              className="h-16 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-xl font-medium text-gray-900"
            >
              {key === 'backspace' ? (
                <Delete className="w-6 h-6" />
              ) : (
                key
              )}
            </button>
          ))}
        </div>

        {/* Take Payment button */}
        <button
          onClick={handleTakePayment}
          disabled={amount === '0'}
          className="w-full bg-gray-900 text-white p-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Take Payment
        </button>
      </div>
    </div>
  );
};

export default AmountInput;