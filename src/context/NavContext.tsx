"use client"
import {useState, useContext, createContext, ReactNode} from 'react'

const navContext = createContext({})
const NavContextProvider = ({children}:{children:ReactNode}) => {
    const [nav, setNav] = useState<boolean>(false)
    const toggleNav = ()=>{
        setNav(prev => !prev)
    }
  return (
    <navContext.Provider value={{nav, toggleNav}}>{children}</navContext.Provider>
  )
}

export default NavContextProvider