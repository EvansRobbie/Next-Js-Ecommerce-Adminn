import AuthProvider from '@/components/sessionProvider/AuthProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import Nav from "@/components/Nav"
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from '@/components/ProtectedRoute'
import HamburgerButton from '@/components/HamburgerButton'
import NavContextProvider from '@/context/NavContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedRoute>
            <NavContextProvider>
            <HamburgerButton/>
              <div className='flex '>
                  <Nav/>
                  <div className="bg-[#1E1E1E] flex-grow py-4 my-4 min-h-screen mr-4 rounded-2xl px-4  ">{children}</div>
              </div>
          </NavContextProvider>
          </ProtectedRoute>
        </AuthProvider>
        </body>
    </html>
  )
}
