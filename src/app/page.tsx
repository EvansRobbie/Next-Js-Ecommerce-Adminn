"use client"
import { useSession} from "next-auth/react"
import Image from "next/image"
export default function Home() {
  const { data:session, status, } = useSession()
  if (status === 'loading'){
    return <p>Loading</p>
  }
  return (
    <main className=" flex justify-between">
      <div className="flex gap-2 ">
        <h2>

        Hello, {session?.user?.name}
        </h2>
        </div>
        <div className="flex gap-2 items-center bg-slate-200/10 backdrop-blur backdrop-filter py-1 px-2 rounded-xl ">

          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image fill={true} src={`${session?.user?.image}`} alt="/userPicture"/>
          </div>
          <span className="font-bold">{session?.user?.name}</span>
        </div>
      
    </main>
  )
}
