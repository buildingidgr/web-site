'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Profile as ProfileType } from '../types/profile';
import { exchangeClerkSessionForTokens } from '../utils/auth';
import { useSession } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import ProfileDropdown from './ProfileDropdown';
import PreferencesForm from './PreferencesForm';

const PROFILE_API_URL = process.env.NEXT_PUBLIC_PROFILE_API_URL;

export default function ProfileComponent() {
  console.log('ProfileComponent: Component mounted');
  console.log('ProfileComponent: API_URL:', PROFILE_API_URL);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const { getToken } = useAuth();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
        if (!apiTokens?.access_token) {
  useEffect(() => {
    console.log('ProfileComponent: useEffect triggered');
          return;
    if (!PROFILE_API_URL) {
      console.error('ProfileComponent: PROFILE_API_URL is not configured');
      setError('Profile service URL is not configured');
      setLoading(false);
      return;
          }
        });
    async function fetchProfile() {
      if (!isSessionLoaded || !isUserLoaded) {
        return;
        }
        const response = await fetch(`${API_URL}/api/profiles/me`, {
      if (!session || !user) {
        setError('No active session');
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      console.log('ProfileComponent: Starting fetchProfile');
      try {
        console.log('ProfileComponent: Getting Clerk token');
        const clerkToken = await getToken();
        const data = await response.json();
        if (!clerkToken) {
          throw new Error('No Clerk token available');
        }
      <div className="flex justify-center items-center p-4">
        console.log('ProfileComponent: Exchanging tokens');
        const apiTokens = await exchangeClerkSessionForTokens(
          clerkToken,
          session.id,
          user.id
        );
        console.log('ProfileComponent: Tokens received:', !!apiTokens);
          console.error('ProfileComponent: API response not OK:', response.status);
        if (!apiTokens?.access_token) {
          console.error('ProfileComponent: No access token available');
          setError('No API token available');
          setLoading(false);
          return;
        }
      <div className="flex justify-center items-center p-4">
        console.log('ProfileComponent: Fetching profile data');
        const response = await fetch(`${PROFILE_API_URL}/api/profiles/me`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${apiTokens.access_token}`,
            'Origin': process.env.NEXT_PUBLIC_WEB_URL || '',
          }
        });
          <img
        if (!response.ok) {
          console.error('ProfileComponent: API response not OK:', response.status);
          throw new Error('Failed to fetch profile');
        }
        )}
        const data = await response.json();
        console.log('ProfileComponent: Profile data received');
        setProfile(data);
      } catch (err) {
        console.error('ProfileComponent: Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
          <h3 className="font-semibold text-lg mb-2">Preferences</h3>
    fetchProfile();
  }, [getToken, session, user, isSessionLoaded, isUserLoaded]);
              <p className="text-sm text-gray-600">Timezone</p>
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );
  }
              <p className="text-sm text-gray-600">Theme</p>
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        {error}
      </div>
    );
  }
            <div className="grid grid-cols-2 gap-2">
  if (!profile) {
    return null;
  }
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt="Profile"
              className="h-16 w-16 rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
            </div>
        <ProfileDropdown />
        </div>
                  <span className="ml-2">{value ? 'Yes' : 'No'}</span>
      <div className="space-y-4">
            <div>
          <h3 className="font-semibold text-lg mb-2">Preferences</h3>
          <PreferencesForm 
            preferences={profile.preferences} 
            onUpdate={handleUpdatePreferences}
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Email Notifications</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(profile.preferences.notifications.email).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className="capitalize text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="ml-2">{value ? 'Yes' : 'No'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const handleUpdatePreferences = async (updatedPreferences: Partial<ProfilePreferences>) => {
  try {
    const clerkToken = await getToken();
    if (!clerkToken) {
      throw new Error('No Clerk token available');
    }

    const apiTokens = await exchangeClerkSessionForTokens(
      clerkToken,
      session?.id,
      user?.id
    );

    if (!apiTokens?.access_token) {
      throw new Error('No API token available');
    }

    const response = await fetch(`${PROFILE_API_URL}/api/profiles/me/preferences`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiTokens.access_token}`,
        'Origin': process.env.NEXT_PUBLIC_WEB_URL || '',
      },
      credentials: 'include',
      body: JSON.stringify(updatedPreferences),
    });

    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }

    const updatedProfile = await response.json();
    setProfile(prev => prev ? { ...prev, preferences: updatedProfile } : null);
  } catch (error) {
    console.error('Failed to update preferences:', error);
    throw error;
  }
};