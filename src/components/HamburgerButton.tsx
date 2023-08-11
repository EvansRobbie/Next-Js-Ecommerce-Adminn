"use client"
import { useNavContext } from '@/context/NavContext'
import React from 'react'
import Logo from './Logo'

const HamburgerButton = () => {
    const { nav, toggleNav } = useNavContext()
    return (
        <div className='md:hidden flex items-center mt-2 px-4'>
            <button  onClick={toggleNav}>
                {
                    nav ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    ) :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                }

            </button>
            <div className='flex grow justify-center'>
            <Logo/>

            </div>
        </div>
    )
}

export default HamburgerButton