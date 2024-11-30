'use client';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

export async function exchangeClerkSessionForTokens(token: string, sessionId?: string, userId?: string) {
    console.log('Auth: Starting token exchange');
    console.log('Auth: Environment variables:', {
      AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
      WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    });
    
    if (!process.env.NEXT_PUBLIC_AUTH_API_URL) {
      console.error('Auth: AUTH_API_URL is not configured. Please check your environment variables.');
      throw new Error('Auth service URL is not configured. Please check your environment variables.');
    }
  
    if (!sessionId || !userId) {
      throw new Error('Session ID and User ID are required');
    }
  
    const url = `${AUTH_API_URL}/v1/token/clerk/exchange`;
    console.log('Auth: Full URL:', url);
    console.log('Auth: Request body:', { sessionId, userId });
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Origin': process.env.NEXT_PUBLIC_WEB_URL || '',
        },
        body: JSON.stringify({
          sessionId,
          userId
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Auth: Exchange failed with status:', response.status, 'Error:', errorText);
        throw new Error(`Failed to exchange session: ${errorText}`);
      }

      const tokens = await response.json();
      console.log('Auth: Token exchange successful');
      return tokens;
    } catch (error) {
      console.error('Auth: Request failed:', error);
      throw error;
    }
}