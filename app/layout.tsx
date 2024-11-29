import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { exchangeClerkSessionForTokens } from './utils/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MechHub',
  description: 'Your Mechanical Engineering Hub',
}

async function handleTokenExchange() {
  try {
    const tokens = await exchangeClerkSessionForTokens()
    return tokens
  } catch (error) {
    console.error('Token exchange failed:', error)
  }
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

