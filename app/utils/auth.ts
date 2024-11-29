'use client';

const AUTH_API_URL = `https://${process.env.NEXT_PUBLIC_AUTH_SERVICE_INTERNAL}`;

export async function exchangeClerkSessionForTokens(token: string) {
    console.log('Auth: Starting token exchange');
    
    if (!token) {
      console.error('Auth: No active session');
      throw new Error('No active session');
    }
  
    console.log('Auth: Making exchange request to:', AUTH_API_URL);
    try {
      const response = await fetch(`${AUTH_API_URL}/api/auth/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token
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