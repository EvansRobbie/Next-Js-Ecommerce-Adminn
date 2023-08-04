"use client"
import React from 'react'
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'
const Login = () => {
  const session = useSession()
  const router = useRouter()
  if (session.status === "loading"){
    return <div className="flex w-full justify-center h-[50vh] items-center">
    <Spinner />
  </div>
  }
  if (session.status === 'authenticated'){
    router.push('/')
  }
  return (
    <div className='flex absolute inset-0 bg-slate-900 w-full min-h-screen items-center justify-center'>
        <button onClick={()=>signIn("google")} className='button '>Login With Google</button>
    </div>
  )
}

export default Login