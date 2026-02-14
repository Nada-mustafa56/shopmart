'use client'
import Link from "next/link";

export default function CategoryErrorPage() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn’t load the categories right now.  
        Please check the link or try again later.
      </p>

      <Link
        href="/"
        className="px-6 py-2 rounded-md bg-green-600 text-white font-medium
                   hover:bg-green-700 transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
    </>
  )
}
