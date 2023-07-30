"use client"
import { fetcher } from '@/components/Fetcher'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import useSWR from 'swr'

interface categoryProp{
    _id:string
    category:string
    parentCategory?:{
        _id:string 
        category:string
    }
}
interface editProp {
    _id:string
}

const categories = () => {
    const [category, setCategory] = useState<string>('')
    const [parentCategory, setParentCategory] = useState<string | undefined>('')
    const [editCategory, setEditCategory] = useState<editProp | any>("")
    const {data, error, isLoading, mutate} = useSWR('/api/categories', fetcher )

    if (error){
        return notFound
    }
    // console.log(data)
    const editCategoryName = (cat:categoryProp) =>{
        setEditCategory(cat)
        setCategory(cat.category)
        setParentCategory(cat.parentCategory?._id)
    }
    const onSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const data = { category, parentCategory}
        try {
            if (editCategory){
                // console.log(editCategory)
                await axios.put('/api/categories', JSON.stringify({...data, _id:editCategory._id})) 
                setEditCategory('')
                toast.success('category editted')
            }else{

                await axios.post('/api/categories', JSON.stringify(data))
                toast.success('category added')
            }
            setCategory('')
            setParentCategory('')
            mutate()
            
        } catch (error) {
            console.log("Failed to save category", error)
            toast.error('Failed to save category')
        }
    }

   
    // console.log(editCategory)
  return (
    <div className=' max-w-3xl mx-auto'>
         {isLoading ? <div className='flex w-full justify-center h-[50vh] items-center'><Spinner/></div>: <>
        <form onSubmit={onSubmit} className='flex flex-col ' >
            <h2>Categories</h2>
                <label htmlFor="category">{editCategory ? `Edit category ${editCategory.category}` :"Create New Category Name" }</label>
                <div className='flex gap-1 items-center py-2'>
                    <input type="text" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Category Name'/>
                    <select className='bg-slate-200 font-semibold text-slate-900 ' value={parentCategory} onChange={(e)=>setParentCategory(e.target.value)} >
                        <option className=''  value="">No Parent Category</option>
                       {data.map(({category, _id}: categoryProp)=>(
                            <option className='!bg-slate-200/10 ' key={_id} value={_id}>{category}</option>
                        ))}
                    </select>
                    <button className='button max-w-max -mt-3.5 '>Save</button>
                </div>
                <ToastContainer/>
        </form>

        <table>
            <thead>
                <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                { data.map((cat: categoryProp)=>(
                <tr key={cat._id}>
                        <td > {cat.category}</td>
                        <td>{cat?.parentCategory?.category}</td>
                        <td className=' items-center flex justify-end gap-4'>
                  <button onClick={() => editCategoryName(cat)} className='bg-orange-500 py-1 px-2.5 gap-1 inline-flex rounded-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                    <span>Edit</span>
                    </button>

                    <button className='bg-red-500/80 py-1 px-2.5 gap-1 inline-flex rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                    <span>Delete</span>
                    </button>
                </td>
                </tr>
                    )
                )}
                    
            </tbody>

        </table>
        </>
}


    </div>
  )
}

export default categories