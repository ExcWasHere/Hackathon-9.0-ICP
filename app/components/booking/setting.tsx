import React, { useState } from 'react';
import { ArrowLeftIcon } from "lucide-react";

export default function Settings() {
  const [showNotificationSettings, setShowNotificationSettings] = useState(true);
  const [showSecuritySettings, setShowSecuritySettings] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    emailNotifications: true,
    pushNotifications: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (setting) => {
    setFormData(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userSettings', JSON.stringify(formData));
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-violet-50 text-black">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex border-b justify-between items-center border-violet-200 pb-5">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold leading-tight text-violet-900">
                Settings
              </h1>
              <p className="mt-2 text-sm text-violet-600">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="w-max h-max p-3 rounded-full bg-violet-400 hover:scale-105 shadow-md duration-200">
              <a href="/booking">
                <ArrowLeftIcon className="flex text-violet-600" />
              </a>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-violet-900 mb-4">
              Profile Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-violet-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full text-slate-900 bg-slate-200 bg-opacity-50 rounded-md border-violet-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-violet-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full text-slate-900 bg-slate-200 bg-opacity-50 rounded-md border-violet-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-violet-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full text-slate-900 bg-slate-200 bg-opacity-50 rounded-md border-violet-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                />
              </div>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <button
              onClick={() => setShowNotificationSettings(!showNotificationSettings)}
              className="flex justify-between w-full"
            >
              <h2 className="text-xl font-semibold text-violet-900">
                Notification Settings
              </h2>
              <span className="text-violet-500">
                {showNotificationSettings ? "−" : "+"}
              </span>
            </button>

            {showNotificationSettings && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-violet-700">
                    Email Notifications
                  </span>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-violet-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    <span className={`${formData.emailNotifications ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full ${formData.emailNotifications ? 'bg-violet-500' : 'bg-white'} shadow ring-0 transition duration-200 ease-in-out`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-violet-700">
                    Push Notifications
                  </span>
                  <button
                    onClick={() => handleToggle('pushNotifications')}
                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-violet-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    <span className={`${formData.pushNotifications ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full ${formData.pushNotifications ? 'bg-violet-500' : 'bg-white'} shadow ring-0 transition duration-200 ease-in-out`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <button
              onClick={() => setShowSecuritySettings(!showSecuritySettings)}
              className="flex justify-between w-full"
            >
              <h2 className="text-xl font-semibold text-violet-900">
                Security Settings
              </h2>
              <span className="text-violet-500">
                {showSecuritySettings ? "−" : "+"}
              </span>
            </button>

            {showSecuritySettings && (
              <div className="mt-4 space-y-4 space-x-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                  Change Password
                </button>

                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                  Enable Two-Factor Authentication
                </button>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}