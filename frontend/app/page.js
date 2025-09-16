'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [backendMessage, setBackendMessage] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch health check
        const healthResponse = await fetch(`${API_BASE_URL}/healthz`);
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          setBackendHealth(healthData);
        }

        // Fetch hello message
        const helloResponse = await fetch(`${API_BASE_URL}/api/v1/hello`);
        if (helloResponse.ok) {
          const helloData = await helloResponse.json();
          setBackendMessage(helloData.message);
        }
      } catch (err) {
        setError('Backend is not running or not accessible');
        console.error('Error fetching backend data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendData();
  }, [API_BASE_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Poseidon Global Maritime University
            </h1>
            <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Learning Management System
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Bringing maritime security courses alive and to persons who have
              never worked at sea, allowing them a glimpse and opportunity to
              achieve greatness with information before embarkation—making the
              transitions smoother than ever.
            </p>
          </div>

          {/* Backend Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Backend Connection Status
            </h3>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">
                  Connecting to backend...
                </span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-red-700 dark:text-red-400 font-medium">
                    Backend Offline
                  </span>
                </div>
                <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
                <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                  Make sure the backend server is running on {API_BASE_URL}
                </p>
              </div>
            )}

            {backendHealth && (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-4 w-4 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      Backend Online
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Status
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {backendHealth.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Uptime
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {Math.floor(backendHealth.uptime)}s
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Check
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(backendHealth.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {backendMessage && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                      API Response
                    </h4>
                    <p className="text-blue-800 dark:text-blue-300">
                      {backendMessage}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`${API_BASE_URL}/healthz`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Health Endpoint
              </a>
              <a
                href={`${API_BASE_URL}/api/v1/hello`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View API Endpoint
              </a>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Planned Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Modular courses with quizzes and final exams',
                'Personal student dashboard',
                'Admin dashboard for founders',
                'AI-powered learning bot',
                'Real-time course chat',
                'Testimonials section',
                'Automated email notifications',
                'Secure payments and course unlocking',
                'Mobile responsive design',
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>
            © 2024 Poseidon Global Maritime University. All rights reserved.
          </p>
          <p className="mt-2">
            Founders: Chief Security Officer: Kaeleigh Woodward • Partner: [Add
            partner&apos;s name here]
          </p>
        </footer>
      </div>
    </div>
  );
}
