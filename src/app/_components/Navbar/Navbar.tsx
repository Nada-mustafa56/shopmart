'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname } from "next/navigation";
import { useContext, useState } from 'react'
import { CartContext, CartContextType } from '@/context/cart.context'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
  const { data } = useSession();
  const router = useRouter();
  const pathname = usePathname(); 
  const cart = useContext(CartContext) as CartContextType;
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  async function logOut() {
    await signOut();
    router.push('/login')
  }

  const activeLink = (path: string) =>
    pathname === path
      ? "text-red-600 font-semibold"
      : "hover:text-red-600 transition-colors duration-300";

  return (
    <>
    <nav className="shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-8">
          <h1 className='font-bold text-2xl'> 
            <Link href="/">ShopMart</Link>
          </h1>

          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            
            <li>
              <Link href="/products" className={activeLink("/products")}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className={activeLink("/categories")}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className={activeLink("/brands")}>
                Brands
              </Link>
            </li>

            {data && (
              <li>
                <Link href="/allorders" className={activeLink("/allorders")}>
                  Orders
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-6 relative">
          <ul className="flex items-center gap-4 text-gray-500 text-lg">
            <li className="relative">
              <Link href={"/cart"}>
                <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-red-600" />
              </Link>
              <h5 className="bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center absolute -right-3 -top-3 text-xs">
                {cart.numOfCartItems ?? 0}
              </h5>
            </li>
          </ul>

          {data ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)} 
                className='bg-black rounded-md border px-4 py-2 font-bold text-white flex items-center gap-2'
              >
                <UserIcon className="w-5 h-5" /> Hi {data.user?.name}
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-2 py-1 hover:bg-red-500 hover:text-white rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition-all duration-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    </>
  )
}
