"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const fetcher = (...args:any) => fetch(args).then((res) => res.json())

const DeleteProduct = ({params:{id}}:{params:{id:string}}) => {
    const router = useRouter()
    const {data} = useSWR(`/api/products/${id}`, fetcher)
    const handleDelete = async () =>{
        try {
            await fetch(`/api/products/${id}`, 
            {method: "DELETE"})
            router.push('/products')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex flex-col w-full items-center'>
        <h4 className='text-xl'>Do you really want to delete {data && data?.title}?</h4>
        <div className='flex gap-2 py-4 '>
            <button className='bg-red-500 py-1 rounded-lg active:scale-105 px-2.5' onClick={handleDelete}>Yes</button>
            <button className='bg-slate-500 py-1 rounded-lg active:scale-105 px-2.5' onClick={() => router.back()}>No</button>

        </div>
    </div>
  )
}

export default DeleteProduct