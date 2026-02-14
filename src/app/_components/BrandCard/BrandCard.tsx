'use client'
import Image from "next/image";
import Link from "next/link";

export default function BrandCard({ brand }: any) {
  return (
    <>
    <Link href={`/brands/${brand._id}`}>
      <div className="border p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition">
        <Image
          src={brand.image || "/placeholder.png"}
          width={300}
          height={200}
          alt={brand.name || "Brand"}
          className="w-full h-32 object-cover rounded-lg"
          priority
        />
        <h3 className="mt-2 text-center font-semibold">{brand.name}</h3>
      </div>
    </Link>
    </>
  )
}
