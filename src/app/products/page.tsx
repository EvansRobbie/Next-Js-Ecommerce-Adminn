"use client"
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

const products = () => {
  const fetcher = (...args:any) => fetch(args).then((res) => res.json())
  const {data, error} = useSWR('/api/products', fetcher)
  console.log(data)

  return (
    <div>
      <Link href={'/products/new'} className='button'>Add new product</Link>
    </div>
  )
}

export default products