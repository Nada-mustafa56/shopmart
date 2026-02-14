import React from "react";
export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Welcome to MyStore
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Discover amazing products at unbeatable prices.  
            Shop easily and enjoy fast delivery.
          </p>
        </section>
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-green-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-700">Get your products quickly and safely.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="font-bold text-lg mb-2">Best Prices</h3>
            <p className="text-gray-700">We offer competitive prices for all products.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="font-bold text-lg mb-2">Customer Support</h3>
            <p className="text-gray-700">Our team is here to help you 24/7.</p>
          </div>
        </section>
      </main>
    </>
  )
}
