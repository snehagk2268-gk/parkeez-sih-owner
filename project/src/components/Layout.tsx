import React from 'react';
import { Car, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-royal-blue-700 p-2 rounded-xl">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-royal-blue-800">Parkeez</span>
                <span className="text-sm text-gray-500 font-medium">Owner Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium">Owner Dashboard</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;