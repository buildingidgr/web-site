'use client';

import { useState, useEffect } from 'react';
import { ProfilePreferences } from '../types/profile';
import { LoadingButton } from './ui/LoadingButton';

interface PreferencesFormProps {
  preferences: ProfilePreferences;
  onUpdate: (preferences: Partial<ProfilePreferences>) => Promise<void>;
}

export default function PreferencesForm({ preferences, onUpdate }: PreferencesFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfilePreferences>(preferences);

  useEffect(() => {
    setFormData(preferences);
  }, [preferences]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const changedPreferences: Partial<ProfilePreferences> = {};
      
      // Compare dashboard settings
      if (JSON.stringify(formData.dashboard) !== JSON.stringify(preferences.dashboard)) {
        changedPreferences.dashboard = formData.dashboard;
      }
      
      // Compare notifications
      if (JSON.stringify(formData.notifications) !== JSON.stringify(preferences.notifications)) {
        changedPreferences.notifications = formData.notifications;
      }
      
      // Compare display settings
      if (JSON.stringify(formData.display) !== JSON.stringify(preferences.display)) {
        changedPreferences.display = formData.display;
      }

      console.log('Sending preferences update:', changedPreferences);
      await onUpdate(changedPreferences);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex justify-end">
        <LoadingButton
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit Preferences
        </LoadingButton>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Dashboard Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <input
              type="text"
              value={formData.dashboard.timezone}
              onChange={(e) => setFormData({
                ...formData,
                dashboard: { ...formData.dashboard, timezone: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <input
              type="text"
              value={formData.dashboard.language}
              onChange={(e) => setFormData({
                ...formData,
                dashboard: { ...formData.dashboard, language: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium">Email Notifications</h4>
          <div className="mt-2 space-y-2">
            {Object.entries(formData.notifications.email).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    notifications: {
                      ...formData.notifications,
                      email: {
                        ...formData.notifications.email,
                        [key]: e.target.checked
                      }
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium">Display</h4>
          <div className="mt-2">
            <select
              value={formData.display.theme}
              onChange={(e) => setFormData({
                ...formData,
                display: { ...formData.display, theme: e.target.value as 'light' | 'dark' | 'system' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <LoadingButton
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          onClick={async () => {
            const changedPreferences: Partial<ProfilePreferences> = {};
            
            if (JSON.stringify(formData.dashboard) !== JSON.stringify(preferences.dashboard)) {
              changedPreferences.dashboard = formData.dashboard;
            }
            
            if (JSON.stringify(formData.notifications) !== JSON.stringify(preferences.notifications)) {
              changedPreferences.notifications = formData.notifications;
            }
            
            if (JSON.stringify(formData.display) !== JSON.stringify(preferences.display)) {
              changedPreferences.display = formData.display;
            }

            await onUpdate(changedPreferences);
            setIsEditing(false);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Save Changes
        </LoadingButton>
      </div>
    </form>
  );
} 