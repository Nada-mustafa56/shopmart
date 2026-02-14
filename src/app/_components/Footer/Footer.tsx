'use client'
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <>
    <footer className="bg-gray-800 text-gray-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3"> MyStore</h2>
          <p className="text-gray-400 text-sm">
            Bringing you the best products at unbeatable prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/products" className="hover:text-green-400">Products</Link></li>
            <li><Link href="/cart" className="hover:text-green-400">Cart</Link></li>
            <li><Link href="/allorders" className="hover:text-green-400">Orders</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p className="text-gray-400 text-sm">Email: support@mystore.com</p>
          <p className="text-gray-400 text-sm">Address: Cairo, Egypt</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-blue-400">
              <FaFacebookF className="w-6 h-6" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-pink-400">
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
              <FaLinkedinIn className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
    </>
  )
}
