'use client'
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }: any) {
  return (
    <>
    <Link href={`/categories/${category._id}`}>
      <div className="border p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition">
        <Image
          src={category.image || "/placeholder.png"} 
          width={300}
          height={300}
          alt={category.name || "Category"}
          className="w-full h-40 object-cover rounded-lg"
          priority
        />
        <h3 className="mt-2 text-center font-semibold">
          {category.name}
        </h3>
      </div>
    </Link>
    </>
  )
}
