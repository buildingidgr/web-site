'use client';

import { useAuth } from '@clerk/nextjs';

export async function exchangeClerkSessionForTokens() {
    const { getToken } = useAuth();
    const clerkToken = await getToken();
    
    if (!clerkToken) {
      throw new Error('No active session');
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: clerkToken
      })
    });
  
    if (!response.ok) {
      throw new Error('Failed to exchange session');
    }
  
    const tokens = await response.json();
    return tokens; // { access_token, refresh_token }
  }