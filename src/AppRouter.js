import React, { useState } from 'react';
import SkyCalculator from './AppFinal';
import LanternCalculator from './LanternCalculator';
import { brandConfig } from './brand-config';

function AppRouter() {
  const [currentCalculator, setCurrentCalculator] = useState('sky');

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <span className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal }}>
                SSC Skylight Calculators
              </span>
            </div>

            {/* Calculator Tabs */}
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentCalculator('sky')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentCalculator === 'sky'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Sky System
              </button>
              <button
                onClick={() => setCurrentCalculator('lantern')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentCalculator === 'lantern'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Lantern System
              </button>
            </div>

            {/* Placeholder for future */}
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      {/* Calculator Content */}
      <div>
        {currentCalculator === 'sky' && <SkyCalculator />}
        {currentCalculator === 'lantern' && <LanternCalculator />}
      </div>
    </div>
  );
}

export default AppRouter;
