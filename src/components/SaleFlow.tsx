import React, { useState } from 'react';
import AmountInput from './AmountInput';
import PaymentMethod from './PaymentMethod';
import PinInput from './PinInput';
import PaymentResult from './PaymentResult';

interface SaleFlowProps {
  onBack: () => void;
}

export type SaleStep = 'amount' | 'payment' | 'pin' | 'result';

const SaleFlow: React.FC<SaleFlowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<SaleStep>('amount');
  const [amount, setAmount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(true);

  const handleAmountNext = (value: string) => {
    setAmount(value);
    setCurrentStep('payment');
  };

  const handlePaymentNext = (method: string) => {
    setPaymentMethod(method);
    setCurrentStep('pin');
  };

  const handlePinSubmit = () => {
    // Simulate payment processing
    const success = Math.random() > 0.3; // 70% success rate for demo
    setIsSuccess(success);
    setCurrentStep('result');
  };

  const handleResultBack = () => {
    setCurrentStep('amount');
    setAmount('0');
    setPaymentMethod('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'amount':
        return (
          <AmountInput
            onNext={handleAmountNext}
            onBack={onBack}
            initialAmount={amount}
          />
        );
      case 'payment':
        return (
          <PaymentMethod
            onNext={handlePaymentNext}
            onBack={() => setCurrentStep('amount')}
            amount={amount}
          />
        );
      case 'pin':
        return (
          <PinInput
            onSubmit={handlePinSubmit}
            onBack={() => setCurrentStep('payment')}
          />
        );
      case 'result':
        return (
          <PaymentResult
            isSuccess={isSuccess}
            amount={amount}
            paymentMethod={paymentMethod}
            onBack={handleResultBack}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
};

export default SaleFlow;
