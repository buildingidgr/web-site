'use client';

import { useAuth } from '@clerk/nextjs';

export async function exchangeClerkSessionForTokens() {
  const { getToken } = useAuth();
  const token = await getToken();
  
  if (!token) {
    throw new Error('No active session');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/exchange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
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