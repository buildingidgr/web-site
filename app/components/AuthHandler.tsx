'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { exchangeClerkSessionForTokens } from '../utils/auth';

export default function AuthHandler() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      exchangeClerkSessionForTokens()
        .then(tokens => {
          console.log('Token exchange successful');
        })
        .catch(error => {
          console.error('Token exchange failed:', error);
        });
    }
  }, [isSignedIn]);

  return null;
} 