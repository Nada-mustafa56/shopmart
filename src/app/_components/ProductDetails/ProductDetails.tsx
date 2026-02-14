import { ProdctsType } from '@/types/products.type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MyBtnDetails from '../MyBtnDetails/MyBtnDetails'
import { Button } from '@/components/ui/button';

export default function ProductDetails({product}:{product:ProdctsType}) {
  return (
    <>
              <div className="flex justify-center">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-semibold text-green-600">
                    {product.price} EGP
                  </span>
                  <span className="flex items-center text-yellow-500">
                    <i className="fa-solid fa-star"></i>
                    <span className="ml-2 text-gray-700">{product.ratingsAverage}</span>
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700">{product.category.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Brand:{" "}
                  <span className="font-medium text-gray-700">{product.brand?.name ?? "No brand"}</span>
                </p>
  
                <p className="text-sm text-gray-500">
                  In Stock:{" "}
                  <span className="font-medium text-gray-700">{product.quantity}</span> pcs
                </p>
                <p className="text-sm text-gray-500">
                  Sold:{" "}
                  <span className="font-medium text-gray-700">{product.sold}</span>
                </p>
    
               <MyBtnDetails id={product._id}  />
               <Button className=" px-4 py-2 border bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
               <i className="fa-regular fa-heart mr-2"></i> Wishlist
               </Button>
                <Link
                  href="/products"
                  className="mt-6 inline-block text-green-600 hover:underline"
                >
                  ← Back to Products
                </Link>
              </div>
    </>
  )
}
