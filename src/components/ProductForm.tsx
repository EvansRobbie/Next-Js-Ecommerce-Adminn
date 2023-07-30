"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "./Spinner";

const ProductForm = ({
  _id:id,
  title: productTitle,
  desc: productDesc,
  price: productPrice,
  image: productImage,
}: {
    _id?:string;
  title?: string;
  desc?: string;
  price?: number;
  image?:File[]
}) => {
    // console.log(_id)
  const [title, setTitle] = useState<string>(productTitle || "");
  const [image, setImage] =  useState<File[]>(productImage || [])
  const [desc, setDesc] = useState<string>(productDesc || "");
  const [price, setPrice] = useState<number>(productPrice || 0);
  const [isUpLoading, setIsUploading] =  useState<boolean>(false)
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const data = {
      title,
      desc,
      price,
      image
    };
    if (id){
        try {
           await axios.put(`/api/products/${id}`, JSON.stringify({...data}))
            router.push('/products')
        } catch (error) {
            console.log(error)
        }
    }else{

        try {
          await axios.post("/api/products", JSON.stringify(data));
          target.reset();
          router.push("/products");
        } catch (error) {
          console.log(error);
        }
    }
  };
  const uploadImages = async (e:ChangeEvent<HTMLInputElement>) =>{
    // console.log(e.target.files)
    const files = e.target.files
    if (files && files?.length > 0){
      setIsUploading(true)
        const data = new FormData()
        for(let i = 0; i < files.length; i++){
          data.append('files', files[i])
        }
        try{
          const {data:filename} = await axios.post('/api/upload', data, {
            headers: {"Content-Type": "multipart/form-data"}
          })
          // console.log(filename.links)
          setImage((prev)=> [...prev, ...filename.links])

        }catch (error) {
          console.log(error);
        }
        setIsUploading(false)
    }
  }
  // console.log(image)
  return (
    <form onSubmit={onSubmit} className="flex flex-col  max-w-3xl mx-auto">
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
      <label htmlFor="photo">Image</label>
      <div className="flex  gap-1  items-center">

          <div className="flex gap-2">
          {!!image.length && image.map((link, idx)=>(
            <div key={idx} className="relative h-24 w-28 mb-4">
                <Image fill={true} className="max-h-full object-cover rounded-xl" src={`${link}`} alt={`/product/${link}`}/>
            </div>
          ))}

          </div>
          {isUpLoading && (
            <div className="h-24 flex items-center">
                <Spinner/>
            </div>
          )}
          <div className="mb-2">
            <label className="w-24 h-24 cursor-pointer text-gray-300/50 rounded-lg text-sm  bg-slate-200/10 flex flex-col items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
              </svg>
              <span>Upload</span>
              <input type="file" className="hidden" onChange={uploadImages}/>
            </label>
            {!image && <div className="text-gray-300/50">No Images in this product</div>}
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
      <div className="flex justify-end">
        <button className="button max-w-max">Save Product</button>
      </div>
    </form>
  );
};

export default ProductForm;
