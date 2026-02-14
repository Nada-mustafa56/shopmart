'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryDetails({ category }: any) {
  return (
    <>
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <Image
          src={category.image}
          alt={category.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold mt-4 text-center">{category.name}</h2>
        {category.description && (
          <p className="mt-2 text-gray-600 text-center">{category.description}</p>
        )}
        <Link
          href="/categories"
          className="mt-4 inline-block text-green-600 hover:underline text-center"
        >
          ← Back to Categories
        </Link>
      </div>
    </div>
    </>
  )
}
  