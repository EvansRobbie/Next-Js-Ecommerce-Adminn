"use client"
import axios from 'axios'
import { METHODS } from 'http'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const fetcher = (...args:any) => fetch(args).then((res) => res.json())

const deleten = ({params:{id}}:{params:{id:string}}) => {
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
    <div>
        <h4>Do you really want to delete {data && data?.title}?</h4>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => router.back()}>No</button>
    </div>
  )
}

export default deleten