'use client'
import Image from "next/image";
import Link from "next/link";

export default function BrandDetails({ brand }: any) {
  if (!brand) return null;

  return (
    <>
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <Image
          src={brand.image || "/placeholder.png"}
          alt={brand.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold mt-4 text-center">{brand.name}</h2>
        {brand.description && (
          <p className="mt-2 text-gray-600 text-center">{brand.description}</p>
        )}
        <Link
          href="/brands"
          className="mt-4 inline-block text-green-600 hover:underline text-center"
        >
          ← Back to Brands
        </Link>
      </div>
    </div>
    </>
  )
}
