"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const ProductForm = ({
  _id:id,
  title: productTitle,
  desc: productDesc,
  price: productPrice,
}: {
    _id?:string;
  title?: string;
  desc?: string;
  price?: number;
}) => {
    // console.log(_id)
  const [title, setTitle] = useState<string>(productTitle || "");
  const [desc, setDesc] = useState<string>(productDesc || "");
  const [price, setPrice] = useState<number>(productPrice || 0);
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const data = {
      title,
      desc,
      price,
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
