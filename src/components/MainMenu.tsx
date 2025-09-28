import React from 'react';
import { CreditCard, Settings, HelpCircle, LogOut, User } from 'lucide-react';

interface MainMenuProps {
  onStartSale: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartSale }) => {
  return (
    <div className="min-h-screen bg-white pt-10">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 pt-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dema Pereverzev Shop</h1>
            <p className="text-sm text-gray-500">24 September</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-4">
        {/* Sale button - primary action */}
        <button
          onClick={onStartSale}
          className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
        >
          Sale
        </button>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-red-50 text-red-700 p-4 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200 border border-red-200">
            Refund
          </button>
          <button className="bg-blue-50 text-blue-700 p-4 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200 border border-blue-200">
            Reports
          </button>
        </div>

        {/* Menu items */}
        <div className="space-y-2 mt-8">
          <MenuButton 
            icon={<CreditCard className="w-5 h-5" />} 
            label="Cash In / Cash Out"
          />
          <MenuButton 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings"
          />
          <MenuButton 
            icon={<HelpCircle className="w-5 h-5" />} 
            label="Help Me"
          />
          <MenuButton 
            icon={<LogOut className="w-5 h-5" />} 
            label="Exit"
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'danger';
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, variant = 'default' }) => {
  const baseClasses = "w-full flex items-center space-x-3 p-4 rounded-lg font-medium transition-colors duration-200";
  const variantClasses = variant === 'danger' 
    ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200";

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default MainMenu;