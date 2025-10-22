
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { YahooIcon } from './components/Icons';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    // In a real app, this would initiate the OAuth 2.0 flow with Yahoo.
    // For this demo, we'll just simulate a successful login.
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <header className="bg-dark-card border-b border-dark-border p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <YahooIcon className="h-8 w-8 text-yahoo-purple" />
          <h1 className="text-xl font-bold text-light-text tracking-wider">
            Fantasy Lineup Optimizer
          </h1>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
          >
            Disconnect
          </button>
        )}
      </header>
      <main className="p-4 sm:p-6 md:p-8">
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
};

export default App;
