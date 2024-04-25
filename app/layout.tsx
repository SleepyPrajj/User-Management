import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AuthProvider from '@/providers/auth-provider'
import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/toaster'
import Carousel from '@/components/carousal/carousal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs fullstack Authentication',
  description: 'Sign-Up and Sign-In with Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className} >
        <AuthProvider>
          
          <Navbar />
          <main className="min-h-screen flex flex-col w-full justify-center items-center">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
