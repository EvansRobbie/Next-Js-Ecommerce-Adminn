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
                <td>
                  <Link className='bg-orange-500 py-1 px-2.5 gap-1 inline-flex rounded-md' href={`products/${_id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                    <span>Edit</span>
                    </Link>
                </td>
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