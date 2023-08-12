"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Spinner from './Spinner'

const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const { data:session, status, } = useSession()
    // console.log(session?.user?.image)
    const router =  useRouter()
    if (status === "loading"){
      return <div className="flex w-full justify-center h-[50vh] items-center">
      <Spinner />
    </div>
    }
    if (status === 'unauthenticated'){
      router.push('/login')
    }
  return children
}

export default ProtectedRoute