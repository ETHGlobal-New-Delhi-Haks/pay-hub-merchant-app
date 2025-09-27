import React from 'react';
import { ArrowLeft, QrCode, Scan, Fingerprint } from 'lucide-react';

interface PaymentMethodProps {
  onNext: (method: string) => void;
  onBack: () => void;
  amount: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onNext, onBack, amount }) => {
  const paymentMethods = [
    {
      id: 'qr',
      name: 'Pay by QR',
      icon: <QrCode className="w-8 h-8" />,
      description: 'Scan QR code to pay'
    },
    {
      id: 'face',
      name: 'Face Pay',
      icon: <Scan className="w-8 h-8" />,
      description: 'Use facial recognition'
    },
    {
      id: 'touch',
      name: 'Touch Pay',
      icon: <Fingerprint className="w-8 h-8" />,
      description: 'Use fingerprint or NFC'
    }
  ];

  const customerAmount = (parseFloat(amount) * 0.0113).toFixed(2); // Mock conversion rate

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="ml-4 text-lg font-semibold text-gray-900">Sale</h1>
      </div>

      {/* Amount summary */}
      <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-4">
          <div className="flex-1 text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Order Total</div>
            <div className="text-xl font-semibold text-gray-900">{amount} ₹</div>
          </div>
          <div className="flex-1 text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Customer Amount</div>
            <div className="text-xl font-semibold text-gray-900">{customerAmount} PYUSD</div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="flex-1 px-6 py-6 space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onNext(method.name)}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-4"
          >
            <div className="text-gray-600">
              {method.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900">{method.name}</div>
              <div className="text-sm text-gray-500">{method.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;