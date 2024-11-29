'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Profile as ProfileType, ProfilePreferences } from '../types/profile';
import { exchangeClerkSessionForTokens } from '../utils/auth';
import { useSession } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import ProfileDropdown from './ProfileDropdown';
import PreferencesForm from './PreferencesForm';

const PROFILE_API_URL = process.env.NEXT_PUBLIC_PROFILE_API_URL;

export default function ProfileComponent() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    async function fetchProfile() {
      if (!isSessionLoaded || !isUserLoaded) {
        return;
      }

      if (!session || !user) {
        setError('No active session');
        setLoading(false);
        return;
      }

      console.log('ProfileComponent: Starting fetchProfile');
      try {
        console.log('ProfileComponent: Getting Clerk token');
        const clerkToken = await getToken();
        
        if (!clerkToken) {
          throw new Error('No Clerk token available');
        }

        console.log('ProfileComponent: Exchanging tokens');
        const apiTokens = await exchangeClerkSessionForTokens(
          clerkToken,
          session.id,
          user.id
        );
        console.log('ProfileComponent: Tokens received:', !!apiTokens);
        
        if (!apiTokens?.access_token) {
          console.error('ProfileComponent: No access token available');
          setError('No API token available');
          setLoading(false);
          return;
        }

        console.log('ProfileComponent: Fetching profile data');
        const response = await fetch(`${PROFILE_API_URL}/api/profiles/me`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${apiTokens.access_token}`,
            'Origin': process.env.NEXT_PUBLIC_WEB_URL || '',
          }
        });

        if (!response.ok) {
          console.error('ProfileComponent: API response not OK:', response.status);
          throw new Error('Failed to fetch profile');
        }

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

    fetchProfile();
  }, [getToken, session, user, isSessionLoaded, isUserLoaded]);

  const handleUpdatePreferences = async (updatedPreferences: Partial<ProfilePreferences>) => {
    try {
      const clerkToken = await getToken();
      if (!clerkToken) {
        throw new Error('No Clerk token available');
      }

      console.log('Starting preferences update...');
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
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${apiTokens.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPreferences),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update preferences failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Failed to update preferences: ${errorText}`);
      }

      const updatedProfile = await response.json();
      console.log('Preferences updated successfully:', updatedProfile);
      setProfile(prev => prev ? { ...prev, preferences: updatedProfile } : null);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

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

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Preferences</h3>
          <PreferencesForm 
            preferences={profile.preferences} 
            onUpdate={handleUpdatePreferences}
          />
        </div>
      </div>
    </div>
  );
}