'use client';

import { getConfig, getConfigValue, isClient } from '@/lib/config';
import { useEffect, useState } from 'react';

export default function Home() {
  const [config, setConfig] = useState(getConfig());
  const [renderTime, setRenderTime] = useState<Date | null>(null);

  useEffect(() => {
    // Update config after hydration to get runtime overrides
    setConfig(getConfig());
    setRenderTime(new Date());
  }, []);

  const apiUrl = getConfigValue('API_URL');
  const featureXEnabled = getConfigValue('FEATURE_X_ENABLED');
  const appName = getConfigValue('APP_NAME');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {appName}
          </h1>
          <p className="text-lg text-gray-600">
            Next.js + NGINX Runtime Configuration Demo
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Configuration Values */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Current Configuration
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">API URL:</span>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                  {apiUrl}
                </code>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">Feature X:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  featureXEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {featureXEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">App Name:</span>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">
                  {appName}
                </code>
              </div>
            </div>
          </div>

          {/* Runtime Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Runtime Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">Environment:</span>
                <span className="text-sm">
                  {isClient() ? 'Client' : 'Server'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">Render Time:</span>
                <span className="text-sm">
                  {renderTime ? renderTime.toLocaleTimeString() : 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700">Runtime Config:</span>
                <span className="text-sm">
                  {isClient() && typeof window !== 'undefined' && window.__CONFIG__ 
                    ? 'Available' 
                    : 'Not Available'}
                </span>
              </div>
            </div>
          </div>

          {/* Feature Demo */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Feature Demo
            </h2>
            {featureXEnabled ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">
                  🎉 Feature X is Enabled!
                </h3>
                <p className="text-green-700">
                  This feature is controlled by the FEATURE_X_ENABLED configuration value.
                  It can be overridden at runtime via NGINX without rebuilding the application.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Feature X is Disabled
                </h3>
                <p className="text-gray-600">
                  This feature is currently disabled. You can enable it by setting 
                  FEATURE_X_ENABLED to true in the runtime configuration.
                </p>
              </div>
            )}
          </div>

          {/* Configuration Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Configuration Details
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              This configuration is merged from environment variables (build-time) 
              and window.__CONFIG__ (runtime).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
