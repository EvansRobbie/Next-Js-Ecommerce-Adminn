import Link from 'next/link'
import React from 'react'

const products = () => {
  return (
    <div>
      <Link href={'/products/new'} className='button'>Add new product</Link>
    </div>
  )
}

export default products