"use client"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
export default function Home() {
  const { data:session, status, } = useSession()
  // console.log(session?.user?.image)
  const router =  useRouter()
  if (status === 'loading'){
    return <p>Loading</p>
  }
  if (status === 'unauthenticated'){
    router.push('/login')
  }
  return (
    <main className=" min-h-screen">
      <div className="flex gap-2 items-center">
        Hello, {session?.user?.name}
        <div className="relative h-10 w-10 rounded-full overflow-hidden ">
          <Image fill={true} src={`${session?.user?.image}`} alt="/userPicture"/>
        </div>
      </div>
    </main>
  )
}
