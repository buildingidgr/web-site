'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">MechHub</span>
            </Link>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <Link
                href="/sign-up"
                className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}

