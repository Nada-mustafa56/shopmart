'use client'
import React from 'react'
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProdctsType } from '@/types/products.type';
import Link from 'next/link';
import Image from 'next/image';
import MyButton from '../MyButton/MyButton';

export default function Product({ product }: { product: ProdctsType }) {
  return (
    <>
    <Card key={product._id} className="w-full h-full flex flex-col justify-between p-4 hover:shadow-lg transition-shadow border border-green-500 rounded-xl">
      <Link href={`/products/${product._id}`} className="block flex-1">
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <Image
            src={product.imageCover}
            width={400}
            height={400}
            alt={product.title}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        <CardHeader className="mt-4">
          <CardTitle className="text-green-500 text-lg">{product.category.name}</CardTitle>
          <CardDescription className="mt-1 line-clamp-1">{product.title}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="flex items-center justify-between mt-2">
        <span className="text-lg font-bold">{product.price} EGP</span>
        <span className="flex items-center gap-1 text-lg font-bold text-amber-400">
          <StarIcon className="w-5 h-5" /> {product.ratingsAverage}
        </span>
      </CardFooter>
      <div className="mt-2 mb-4">
        <button className="flex items-center gap-1 text-red-500 hover:text-red-600 transition">
          <HeartIcon className="w-5 h-5" /> 
        </button>
      </div>
        <MyButton id={product._id} />
      

    </Card>
    </>
  )
}
