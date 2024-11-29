import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

async function handleTokenExchange() {
  try {
    const tokens = await exchangeClerkSessionForTokens()
    // Store tokens securely (e.g., in memory or secure cookie)
    return tokens
  } catch (error) {
    console.error('Token exchange failed:', error)
  }
}

export const metadata = {
  title: 'MechHub',
  description: 'Your Mechanical Engineering Hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      afterSignIn={handleTokenExchange}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

