'use client';

import { useAuth, useSession, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { exchangeClerkSessionForTokens } from '../utils/auth';

export default function AuthHandler() {
  const { isSignedIn, getToken } = useAuth();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const { user, isLoaded: isUserLoaded } = useUser();

  useEffect(() => {
    async function handleTokenExchange() {
      if (isSignedIn && isSessionLoaded && isUserLoaded && session && user) {
        try {
          const clerkToken = await getToken();
          if (!clerkToken) {
            throw new Error('No Clerk token available');
          }
          
          const tokens = await exchangeClerkSessionForTokens(
            clerkToken,
            session.id,
            user.id
          );
          console.log('Token exchange successful');
        } catch (error) {
          console.error('Token exchange failed:', error);
        }
      }
    }

    handleTokenExchange();
  }, [isSignedIn, getToken, session, user, isSessionLoaded, isUserLoaded]);

  return null;
} 