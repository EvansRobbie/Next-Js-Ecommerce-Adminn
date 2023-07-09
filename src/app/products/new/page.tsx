"use client"
import React, { FormEvent } from 'react'

const newProduct = () => {
    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement
        const title = (target[0] as HTMLInputElement).value
        const desc = (target[1] as HTMLInputElement).value
        const price = (target[2] as HTMLInputElement).value

        target.reset()

        console.log(title, desc, price)

    }
  return (
    <form onSubmit={onSubmit} className='flex flex-col  max-w-3xl mx-auto'>
        <h2 className=''>New Product</h2>
        <label htmlFor="prodName">Product name</label>
        <input id='prodName' type="text" placeholder='Product name' required/>
        <label htmlFor="prodDesc">Description</label>
        <textarea id='prodDesc' className='h-20' placeholder='Product description' required/>
        <label htmlFor="prodPrice">Price (Ksh)</label>
        <input id='prodPrice' type="number" placeholder='price' />
        <div className='flex justify-end'>

            <button className='button max-w-max'>Add Product</button>
        </div>
    </form>
  )
}

export default newProduct