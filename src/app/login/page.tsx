"use client"
import React from 'react'
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
const Login = () => {
  const session = useSession()
  const router = useRouter()
  if (session.status === "loading"){
    return <p>Loading..</p>
  }
  if (session.status === 'authenticated'){
    router.push('/')
  }
  return (
    <div className='flex w-full h-screen items-center justify-center'>
        <button onClick={()=>signIn("google")} className='button '>Login With Google</button>
    </div>
  )
}

export default Login