'use client';

export async function exchangeClerkSessionForTokens(token: string) {
    console.log('Auth: Starting token exchange');
    
    if (!token) {
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
        token
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