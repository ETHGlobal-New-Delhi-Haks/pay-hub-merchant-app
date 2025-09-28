import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface PaymentResultProps {
  isSuccess: boolean;
  amount: string;
  paymentMethod: string;
  onBack: () => void;
}

const PaymentResult: React.FC<PaymentResultProps> = ({ 
  isSuccess, 
  amount, 
  paymentMethod, 
  onBack 
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col  pt-10">

      {/* Result content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {isSuccess ? (
            <>
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Success</h1>
                <p className="text-gray-600">
                  Payment of {amount} ₹ completed successfully via {paymentMethod}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Declined</h1>
                <p className="text-gray-600 mb-2">Insufficient Funds</p>
                <p className="text-sm text-gray-500">
                  Payment of {amount} ₹ could not be processed
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="p-6">
        <button
          onClick={onBack}
          className="w-full bg-gray-900 text-white p-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          New Sell
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;