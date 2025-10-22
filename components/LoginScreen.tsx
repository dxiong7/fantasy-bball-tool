
import React from 'react';
import { YahooIcon, CheckCircleIcon } from './Icons';
import { getLoginUrl } from '../services/authService';

const LoginScreen: React.FC = () => {

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-10 md:mt-20">
      <div className="bg-dark-card p-8 rounded-xl shadow-2xl border border-dark-border">
        <h2 className="text-3xl font-bold text-light-text mb-2">
          Automate Your Fantasy Lineups
        </h2>
        <p className="text-medium-text mb-8 max-w-md">
          Stop manually setting your lineup every day. Connect your Yahoo Fantasy account, and we'll start your active players automatically.
        </p>

        <div className="space-y-4 text-left mb-8">
            <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                <span className="text-light-text">Fetches your current roster</span>
            </div>
            <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                <span className="text-light-text">Identifies players with games today</span>
            </div>
            <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                <span className="text-light-text">Moves active players from bench to starting spots</span>
            </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center px-6 py-3 bg-yahoo-purple text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 text-lg shadow-lg"
        >
          <YahooIcon className="h-6 w-6 mr-3" />
          Connect with Yahoo Fantasy
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-6">
        This is a demo application. Clicking connect will use mock data and does not actually connect to your Yahoo account.
      </p>
    </div>
  );
};

export default LoginScreen;
