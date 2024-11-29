'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Profile as ProfileType } from '../types/profile';
import { exchangeClerkSessionForTokens } from '../utils/auth';

const PROFILE_API_URL = process.env.NEXT_PUBLIC_PROFILE_SERVICE_INTERNAL 
  ? `https://${process.env.NEXT_PUBLIC_PROFILE_SERVICE_INTERNAL}`
  : '';

export default function ProfileComponent() {
  console.log('ProfileComponent: Component mounted');
  console.log('ProfileComponent: API_URL:', PROFILE_API_URL);

  const { getToken } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('ProfileComponent: useEffect triggered');
    
    if (!PROFILE_API_URL) {
      console.error('ProfileComponent: PROFILE_API_URL is not configured');
      setError('Profile service URL is not configured');
      setLoading(false);
      return;
    }
    
    async function fetchProfile() {
      console.log('ProfileComponent: Starting fetchProfile');
      try {
        console.log('ProfileComponent: Getting Clerk token');
        const clerkToken = await getToken();
        
        if (!clerkToken) {
          throw new Error('No Clerk token available');
        }

        console.log('ProfileComponent: Exchanging tokens');
        const apiTokens = await exchangeClerkSessionForTokens(clerkToken);
        console.log('ProfileComponent: Tokens received:', !!apiTokens);
        
        if (!apiTokens?.access_token) {
          console.error('ProfileComponent: No access token available');
          setError('No API token available');
          setLoading(false);
          return;
        }

        console.log('ProfileComponent: Fetching profile data');
        const response = await fetch(`${PROFILE_API_URL}/api/profiles/me`, {
          headers: {
            'Authorization': `Bearer ${apiTokens.access_token}`,
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
  }, []);

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
      <div className="flex items-center space-x-4 mb-6">
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

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Timezone</p>
              <p>{profile.preferences.dashboard.timezone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Language</p>
              <p>{profile.preferences.dashboard.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Theme</p>
              <p className="capitalize">{profile.preferences.display.theme}</p>
            </div>
          </div>
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