import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Set prices in any currency — get paid in dollar",
    description: "List your products in USD, EUR, THB, INR, or any other fiat currency. Your customers pay in crypto, while we automatically convert the payment into PayPal USD (PYUSD).",
  },
  {
    title: "Get paid worldwide — instantly, in dollars.",
    description: "Let your customers pay however they like: Bitcoin, Ethereum, or any tokens from any chain. You always receive stable PayPal USD (PYUSD), ready to withdraw straight to your bank. No crypto hassle. No volatility risk. No complex index.",
  },
  {
    title: "Accept payments by face, tap, or QR.",
    description: "Give your customers the freedom to pay how they want — with biometrics, contactless tap, or a simple QR scan. They pay in crypto. You always receive stable dollars in PayPal USD (PYUSD).",
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoSlideTimer, setAutoSlideTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  const startAutoSlideTimer = () => {
    // Clear existing timer if any
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer);
    }
    
    // Only start timer if not on last slide
    if (currentSlide < slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
      }, 5000);
      setAutoSlideTimer(timer);
    }
  };

  const resetAutoSlideTimer = () => {
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer);
      setAutoSlideTimer(null);
    }
    // Restart timer after user interaction
    setTimeout(startAutoSlideTimer, 100);
  };

  // Start auto-slide timer on mount and when slide changes
  useEffect(() => {
    startAutoSlideTimer();
    
    // Cleanup timer on unmount
    return () => {
      if (autoSlideTimer) {
        clearTimeout(autoSlideTimer);
      }
    };
  }, [currentSlide]);
  const nextSlide = () => {
    resetAutoSlideTimer();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    resetAutoSlideTimer();
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    resetAutoSlideTimer();
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    resetAutoSlideTimer();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col  pt-10">
      {/* Main content */}
      <div 
        className="flex-1 flex flex-col justify-center px-6 py-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gray-900 w-6' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-2 rounded-full transition-all duration-200 ${
              currentSlide === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'opacity-100 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {currentSlide === slides.length - 1 ? (
            <button
              onClick={onComplete}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;