'use client';

import { useAuth, useSession, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { exchangeClerkSessionForTokens } from '../utils/auth';
import { tokenManager } from '../utils/tokenManager';

export default function AuthHandler() {
  const { isSignedIn, getToken } = useAuth();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    async function handleTokenExchange() {
      if (isSignedIn && isSessionLoaded && isUserLoaded && session && user) {
        try {
          // Only exchange if we don't have a valid token
          if (!tokenManager.getAccessToken()) {
            const clerkToken = await getToken();
            if (!clerkToken) {
              throw new Error('No Clerk token available');
            }
            
            const tokens = await exchangeClerkSessionForTokens(
              clerkToken,
              session.id,
              user.id
            );
            tokenManager.setTokens(tokens);
          }
        } catch (error) {
          console.error('Token exchange failed:', error);
          tokenManager.clear();
        }
      }
    }

    handleTokenExchange();
  }, [isSignedIn, getToken, session, user, isSessionLoaded, isUserLoaded]);

  return null;
} 