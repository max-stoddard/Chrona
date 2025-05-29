import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: 'Profile',
      description: 'Manage your personal information',
      icon: '👤',
      action: () => console.log('Profile clicked'),
    },
    {
      title: 'Availability',
      description: 'Set your study availability',
      icon: '📅',
      action: () => navigate('/availability'),
    },
    {
      title: 'AI Personalisation',
      description: 'Customize your AI learning experience',
      icon: '🤖',
      action: () => console.log('AI settings clicked'),
    },
    {
      title: 'Privacy',
      description: 'Control your privacy settings',
      icon: '🔒',
      action: () => console.log('Privacy clicked'),
    },
    {
      title: 'Appearance',
      description: 'Customize the app appearance',
      icon: '🎨',
      action: () => console.log('Appearance clicked'),
    },
    {
      title: 'Notifications',
      description: 'Manage your notifications',
      icon: '🔔',
      action: () => console.log('Notifications clicked'),
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="bg-gray-800 shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="bg-gray-800 shadow rounded-lg p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settingsSections.map((section) => (
              <button
                key={section.title}
                onClick={section.action}
                className="bg-gray-700 p-6 rounded-lg text-left hover:bg-gray-600 hover:transform hover:scale-[1.02] transition-all duration-200 flex items-start space-x-4 shadow-lg"
              >
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                  <p className="text-gray-300 mt-1">{section.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
