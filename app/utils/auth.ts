'use client';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

export async function exchangeClerkSessionForTokens(token: string, sessionId?: string, userId?: string) {
    console.log('Auth: Starting token exchange');
    
    if (!AUTH_API_URL) {
      console.error('Auth: AUTH_API_URL is not configured');
      throw new Error('Auth service URL is not configured');
    }
  
    const url = `${AUTH_API_URL}/v1/token/clerk/exchange`;
    console.log('Auth: Making exchange request to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Origin': process.env.NEXT_PUBLIC_WEB_URL || '',
          'Authorization': `Bearer ${token}`
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