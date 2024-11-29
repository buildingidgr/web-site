'use client';

import { useAuth } from '@clerk/nextjs';

export async function exchangeClerkSessionForTokens() {
    console.log('Auth: Starting token exchange');
    const { getToken } = useAuth();
    const clerkToken = await getToken();
    
    console.log('Auth: Clerk token obtained:', !!clerkToken);
    
    if (!clerkToken) {
      console.error('Auth: No active session');
      throw new Error('No active session');
    }
  
    console.log('Auth: Making exchange request to:', process.env.NEXT_PUBLIC_API_URL);
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
      console.error('Auth: Exchange failed with status:', response.status);
      throw new Error('Failed to exchange session');
    }
  
    const tokens = await response.json();
    console.log('Auth: Token exchange successful');
    return tokens;
}