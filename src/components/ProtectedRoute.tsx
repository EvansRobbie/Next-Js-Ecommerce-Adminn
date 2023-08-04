"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const { data:session, status, } = useSession()
    // console.log(session?.user?.image)
    const router =  useRouter()
    if (status === 'loading'){
      return <p>Loading</p>
    }
    if (status === 'unauthenticated'){
      router.push('/login')
    }
  return children
}

export default ProtectedRoute