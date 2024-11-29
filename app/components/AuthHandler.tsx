'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { exchangeClerkSessionForTokens } from '../utils/auth';

export default function AuthHandler() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    async function handleTokenExchange() {
      if (isSignedIn) {
        try {
          const clerkToken = await getToken();
          if (!clerkToken) {
            throw new Error('No Clerk token available');
          }
          
          const tokens = await exchangeClerkSessionForTokens(clerkToken);
          console.log('Token exchange successful');
        } catch (error) {
          console.error('Token exchange failed:', error);
        }
      }
    }

    handleTokenExchange();
  }, [isSignedIn, getToken]);

  return null;
} 