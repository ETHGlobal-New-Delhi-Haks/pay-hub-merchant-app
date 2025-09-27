import React, { useState } from 'react';
import MainMenu from './MainMenu';
import SaleFlow from './SaleFlow';

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'sale'>('menu');

  const handleStartSale = () => {
    setCurrentView('sale');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'menu' ? (
        <MainMenu onStartSale={handleStartSale} />
      ) : (
        <SaleFlow onBack={handleBackToMenu} />
      )}
    </div>
  );
};

export default Dashboard;