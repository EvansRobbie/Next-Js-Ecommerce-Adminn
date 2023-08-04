"use client";
import axios from "axios";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { fetcher } from "./Fetcher";
import {  toast } from "react-toastify";
import useSWR from 'swr'

interface ImageFile extends File {
  id: number;
}
interface ProductFormProps {
  _id?: string;
  title?: string;
  category?: string;
  desc?: string;
  price?: number;
  image?: File[];
}

interface categoryProp {
  _id: string;
  category: string;
  parentCategory?: {
    _id: string;
    category: string;
  };
}
const ProductForm: React.FC<ProductFormProps> = ({
  _id: id,
  title: productTitle,
  category:productCategory,
  desc: productDesc,
  price: productPrice,
  image: productImage,
}): JSX.Element => {
  // console.log(_id)
  const [title, setTitle] = useState<string>(productTitle || "");
  const [category, setCategory] = useState<string>(productCategory || '')
  const [image, setImage] = useState<File[]>(productImage || []);
  const [desc, setDesc] = useState<string>(productDesc || "");
  const [price, setPrice] = useState<number>(productPrice || 0);
  const [isUpLoading, setIsUploading] = useState<boolean>(false);
  const { data:categories, error, isLoading, mutate } = useSWR("/api/categories", fetcher);
  const router = useRouter();

  if (error){
     notFound
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const data = {
      title,
      desc,
      price,
      image,
      category,
    };
    try{

      if (id) {
          await axios.put(`/api/products/${id}`, JSON.stringify({ ...data }));
          router.push("/products");
          mutate()
          toast.success('Product details updated')
      } else {
          await axios.post("/api/products", JSON.stringify(data));
          target.reset();
          router.push("/products");
          toast.success('Product created successfully')
       
    }
    }catch (error) {
      console.log(error);
    }
  };
  const uploadImages = async (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files)
    const files = e.target.files;
    if (files && files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }
      try {
        const { data: filename } = await axios.post("/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log(filename.links)
        setImage((prev) => [...prev, ...filename.links]);
      } catch (error) {
        console.log(error);
      }
      setIsUploading(false);
    }
  };
  // console.log(image)
  const updateImagesOrder = (image: any) => {
    setImage(image as File[]);
  };

  // const removeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, link:File)=>{
  //   e.preventDefault()
  //   setImage([...image.filter((photo)=> photo !== link)])
  // }

  const propertiesToFill = []
  if (categories && categories.length > 0 && category){
    let catInfo = categories.find(({_id}:any) => _id === category )
    // console.log(catInfo)
    propertiesToFill.push(...catInfo?.properties)
    while(catInfo?.parentCategory?._id){
      const parent = categories.find(({_id}:any) => _id === catInfo?.parentCategory?._id )
      // console.log(parent.properties)
      propertiesToFill.push(...parent?.properties)
      // break;
      catInfo = parent
    }
  }
  // console.log(propertiesToFill)
  return (
    
    <form onSubmit={onSubmit} className="flex flex-col gap-1 max-w-3xl mx-auto">
      {isLoading ? (
        <div className="flex w-full justify-center h-[50vh] items-center">
          <Spinner />
        </div>
      ) :(
          <>
            <h2 className="">{id ? "Edit" : "New"} Product</h2>
            <label htmlFor="prodName">Product name</label>
            <input
              id="prodName"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product name"
              required
            />
            <label htmlFor="category">Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="text-slate-900 bg-slate-200 font-semibold" id="category">
              <option value="">Uncategorized</option>
                {categories.map(({_id, category}:categoryProp) =>(
                    <option key={_id} value={_id}>{category}</option>
                ))}
            </select>
           {propertiesToFill.length > 0 && propertiesToFill.map((p, idx)=>(
            <div className="" key={idx}>{p.name}</div>
           ))}
            <label htmlFor="photo">Image</label>
            <div className="flex  gap-1  items-center">
              <ReactSortable
                list={image as ImageFile[]}
                setList={updateImagesOrder}
                className="flex gap-2 relative"
              >
                {!!image.length &&
                  image.map((link, idx) => (
                  
                      <div key={idx} className="relative h-24 w-28 mb-4">
                        <Image
                          fill={true}
                          className="max-h-full object-cover rounded-xl"
                          src={`${link}`}
                          alt={`/product/${link}`}
                        />
                          {/* <button onClick={(e) =>removeImage(e,link)} className='absolute top-1 right-1 bg-black cursor-pointer text-white py-1.5 px-2 md:py-2 md:px-3 rounded-xl bg-opacity-50'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                      </button> */}
                      </div>
                  
                  ))}
              </ReactSortable>
              {isUpLoading && (
                <div className="h-24 flex items-center">
                  <Spinner />
                </div>
              )}
              <div className="mb-2">
                <label className="w-24 h-24 cursor-pointer text-gray-300/50 rounded-lg text-sm  bg-slate-200/10 flex flex-col items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                    />
                  </svg>
                  <span>Upload</span>
                  <input type="file" className="hidden" onChange={uploadImages} />
                </label>
                {!image && (
                  <div className="text-gray-300/50">No Images in this product</div>
                )}
              </div>
            </div>
            <label htmlFor="prodDesc">Description</label>
            <textarea
              id="prodDesc"
              className="h-20"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Product description"
              required
            />
            <label htmlFor="prodPrice">Price (Ksh)</label>
            <input
              id="prodPrice"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="price"
            />
            <div className="flex justify-end mt-4">
              <button className="button max-w-max">Save Product</button>
            </div>
            
          </>
      )}
      
    </form>
  );
};

export default ProductForm;
