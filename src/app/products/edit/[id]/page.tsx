import ProductForm from '@/components/ProductForm'
import axios from 'axios'
import { notFound } from 'next/navigation'
import React from 'react'

const getProductData = async (id:string) =>{
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {cache:'no-store'})

    if (!res.ok){
        return notFound()
    }

    return res.json()
}

const product = async ({params:{id}}:{params:{id:string}}) => {
    // console.log(id)
    const data = await getProductData(id)
    // console.log(data)
  return (
    <>
      {data && <ProductForm {...data}/>}
    </>
  )
}

export default product