import Navigation from './components/navigation'
import ProfileComponent from './components/Profile'
import { SignedIn } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to MechHub</h1>
          <p className="mt-2 text-gray-600">Your one-stop platform for all things mechanical engineering.</p>
          
          <SignedIn>
            <div className="mt-6">
              <ProfileComponent />
            </div>
          </SignedIn>
        </div>
      </main>
    </div>
  )
}

