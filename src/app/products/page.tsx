"use client"
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

interface productProp{
  _id:string
  title:string
  desc:string
  price:number
}

const products = () => {
  const fetcher = (...args:any) => fetch(args).then((res) => res.json())
  const {data, error, isLoading} = useSWR('/api/products', fetcher)
  // console.log(data)

  return (
    <div>
      <Link href={'/products/new'} className='button'>Add new product</Link>
      {
        isLoading ? 'Loading' : (

        <table>
          <thead>
            <tr>
              <td>Product Name</td>
              <td>Pr</td>
            </tr>
          </thead>
          <tbody>
            { data.map(({_id, price, title, desc}:productProp) =>(
              <tr >
                <td >{title}</td>
                <td>{price}</td>
              </tr>
            )) }

          </tbody>
        </table>
        )
      }
    </div>
  )
}

export default products