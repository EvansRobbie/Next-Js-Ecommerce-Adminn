"use client"
import {useState, useContext, createContext, ReactNode, Dispatch, SetStateAction} from 'react'

interface navProps {
    nav:boolean
    setNav:Dispatch<SetStateAction<boolean>>
    toggleNav: ()=>void
}
const navContext = createContext({} as navProps)
const NavContextProvider = ({children}:{children:ReactNode}) => {
    const [nav, setNav] = useState<boolean>(false)
    const toggleNav = ()=>{
        setNav(prev => !prev)
    }
  return (
    <navContext.Provider value={{nav, setNav, toggleNav}}>{children}</navContext.Provider>
  )
}
 export const useNavContext = () =>{
    return useContext(navContext)
 }

export default NavContextProvider