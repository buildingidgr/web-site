import { auth } from '@clerk/nextjs';

export async function exchangeClerkSessionForTokens() {
  const { sessionId, userId } = auth();
  
  if (!sessionId || !userId) {
    throw new Error('No active session');
  }

  const response = await fetch('/api/auth/exchange', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      userId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to exchange session');
  }

  return response.json();
}

export async function refreshTokens(refreshToken: string) {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken })
  })

  if (!response.ok) {
    throw new Error('Failed to refresh tokens')
  }

  return response.json()
} 