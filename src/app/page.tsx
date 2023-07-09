"use client"
import Nav from "@/components/Nav"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const session = useSession()
  const router =  useRouter()
  if (session.status === 'loading'){
    return <p>Loading</p>
  }
  if (session.status === 'unauthenticated'){
    router.push('/login')
  }
  return (
    <main className="flex min-h-screen">
      <Nav/>
    </main>
  )
}
