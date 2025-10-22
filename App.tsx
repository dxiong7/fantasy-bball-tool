
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';
import { YahooIcon } from './components/Icons';
import { isAuthenticated, logout } from './services/authService';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(isAuthenticated());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg font-sans">
        <header className="bg-dark-card border-b border-dark-border p-4 flex justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3">
            <YahooIcon className="h-8 w-8 text-yahoo-purple" />
            <h1 className="text-xl font-bold text-light-text tracking-wider">
              Fantasy Lineup Optimizer
            </h1>
          </div>
          {auth && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Disconnect
            </button>
          )}
        </header>
        <main className="p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/callback" element={<Callback />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
