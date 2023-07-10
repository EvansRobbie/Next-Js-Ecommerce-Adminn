"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'

const newProduct = () => {
    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {title, desc, price}
        const target = e.target as HTMLFormElement
        // const title = (target[0] as HTMLInputElement).value
        // const desc = (target[1] as HTMLInputElement).value
        // const price = (target[2] as HTMLInputElement).value

        target.reset()

        console.log(data)

    }
  return (
    <form onSubmit={onSubmit} className='flex flex-col  max-w-3xl mx-auto'>
        <h2 className=''>New Product</h2>
        <label htmlFor="prodName">Product name</label>
        <input id='prodName' type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='Product name' required/>
        <label htmlFor="prodDesc">Description</label>
        <textarea id='prodDesc' className='h-20' onChange={(e)=>setDesc(e.target.value)} placeholder='Product description' required/>
        <label htmlFor="prodPrice">Price (Ksh)</label>
        <input id='prodPrice' type="number" onChange={(e)=>setPrice(Number(e.target.value))} placeholder='price' />
        <div className='flex justify-end'>

            <button className='button max-w-max'>Add Product</button>
        </div>
    </form>
  )
}

export default newProduct