import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthHandler from './components/AuthHandler'

const inter = Inter({ subsets: ['latin'] })

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthHandler />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

