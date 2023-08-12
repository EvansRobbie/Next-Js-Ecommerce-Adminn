"use client";
import { fetcher } from "@/components/Fetcher";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { notFound } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";
import { withSwal } from "react-sweetalert2";

interface categoryProp {
  _id: string;
  category: string;
  parentCategory?: {
    _id: string;
    category: string;
  };
  properties?:
    | {
        name: string;
        values: string;
      }[]
    | any;
}
interface editProp {
  _id: string;
}
interface propertyProp {
  name: string;
  value: string;
}
export default withSwal(({ swal}: {swal:any}, ref:any) => {
  const [category, setCategory] = useState<string>("");
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<editProp | any>("");
  const [properties, setProperties] = useState<propertyProp[]>([]);
  const { data, error, isLoading, mutate } = useSWR("/api/categories", fetcher);

  if (error) {
    return notFound;
  }
  // console.log(data)
  const editCategoryName = (cat: categoryProp) => {
    setEditCategory(cat);
    setCategory(cat.category);
    setProperties(
      cat.properties?.map(
        ({ name, values }: { name: string; values: string[] }) => ({
          name: name,
          value: values.join(","),
        })
      )
    );
    setParentCategory(cat.parentCategory?._id || null);
  };

  const deleteCategory = (cat: categoryProp) => {
    const { _id: id } = cat;
    swal
      .fire({
        title: "Are You sure?",
        text: `Do you want to delete ${cat.category}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async ({ isConfirmed }: { isConfirmed: boolean }) => {
        if (isConfirmed) {
          await axios.delete(`/api/categories/${id}`);
          mutate();
          toast.success("Category Deleted");
        }
      })
      .catch((error: any) => {
        console.log(error);
        toast.error("Failed to delete Category");
      });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      category,
      parentCategory: parentCategory || null,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.value.split(","),
      })),
    };
    try {
      if (editCategory) {
        // console.log(editCategory)
        await axios.put(
          "/api/categories",
          JSON.stringify({ ...data, _id: editCategory._id })
        );
        setEditCategory("");
        toast.success("category editted");
      } else {
        await axios.post("/api/categories", JSON.stringify(data));
        toast.success("category added");
      }
      setCategory("");
      setParentCategory("");
      setProperties([]);
      mutate();
    } catch (error) {
      console.log("Failed to save category", error);
      toast.error("Failed to save category");
    }
  };
  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  };
  const removeProperty = (index: number) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      const result = newProperties.filter((_, p_index) => p_index !== index);
      return result;
    });
  };
  const handlePropertyName = (index: number, newName: string) => {
    // console.log({newName, property, index})
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlePropertyValue = (index: number, newValue: string) => {
    // console.log({newName, property, index})
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  };
  //   console.log(properties)
  return (
    <div className=" max-w-3xl mx-auto" ref={ref}>
      {isLoading ? (
        <div className="flex w-full justify-center h-[50vh] items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit} className=" ">
            <div className="flex flex-col">
              <h2>Categories</h2>
              <label htmlFor="category">
                {editCategory
                  ? `Edit category ${editCategory.category}`
                  : "Create New Category Name"}
              </label>
              <div className="flex gap-1 items-center py-2">
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category Name"
                />
                <select
                  className="bg-slate-200 font-semibold text-slate-900 "
                  value={parentCategory || ""}
                  onChange={(e) => setParentCategory(e.target.value)}
                >
                  <option className="" value="">
                    No Parent Category
                  </option>
                  {data.map(({ category, _id }: categoryProp) => (
                    <option className="!bg-slate-200/10 " key={_id} value={_id}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 pb-4">
                <label htmlFor="properties">Properties</label>
                <button
                  onClick={addProperty}
                  type="button"
                  className="button text-sm max-w-max bg-green-600 hover:bg-green-700"
                >
                  Add new Property
                </button>
                {!!properties.length &&
                  properties.map((property, index) => {
                    // console.log(property.name)
                    return (
                      <div key={index} className=" flex items-center gap-2">
                        <input
                          onChange={(e) =>
                            handlePropertyName(index, e.target.value)
                          }
                          value={property.name}
                          type="text"
                          placeholder="property name e.g. color"
                        />
                        <input
                          onChange={(e) =>
                            handlePropertyValue(index, e.target.value)
                          }
                          value={property.value}
                          type="text"
                          placeholder="values, comma separated"
                        />
                        <button
                          onClick={() => removeProperty(index)}
                          type="button"
                          className="button bg-red-500 hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
              </div>
              <div className="flex gap-2">
                {editCategory && (
                  <button
                    onClick={() => {
                      setEditCategory(null);
                      setCategory("");
                      setParentCategory(null);
                      setProperties([]);
                    }}
                    className="button max-w-max bg-slate-200/10 hover:bg-slate-200/30"
                    type="button"
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="button max-w-max ">
                  Save
                </button>
              </div>
            </div>
            <ToastContainer />
          </form>
          {!editCategory && (
            <table>
              <thead>
                <tr>
                  <td>Category Name</td>
                  <td>Parent Category</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {data.map((cat: categoryProp) => (
                  <tr key={cat._id}>
                    <td> {cat.category}</td>
                    <td>{cat?.parentCategory?.category}</td>
                    <td className=" items-center flex justify-end gap-4">
                      <button
                        onClick={() => editCategoryName(cat)}
                        className="bg-orange-500 py-1 px-2.5 gap-1 inline-flex rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => deleteCategory(cat)}
                        className="bg-red-500/80 py-1 px-2.5 gap-1 inline-flex rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>

                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
});
