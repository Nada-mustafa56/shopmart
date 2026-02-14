'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  product: {
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
};

type Order = {
  id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  cartItems: OrderItem[];
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userToken");
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17",
          {
            headers: {
              "Content-Type": "application/json",
              token: token || "",
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
        else setOrders([]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return <p className="p-6 text-center text-lg text-gray-500">Loading orders...</p>;

  if (!orders.length)
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <p className="text-xl text-gray-600">No orders found </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    );

  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg mb-2">Order ID: {order.id}</h2>
            <p className="text-gray-500 text-sm mb-1">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm mb-1">
              Payment: {order.paymentMethodType}
            </p>
            <p className="text-gray-500 text-sm mb-1">
              Status:{" "}
              <span className={order.isPaid ? "text-green-600" : "text-red-500"}>
                {order.isPaid ? "Paid " : "Not Paid "}
              </span>{" "}
              |{" "}
              <span className={order.isDelivered ? "text-green-600" : "text-yellow-500"}>
                {order.isDelivered ? "Delivered " : "Pending "}
              </span>
            </p>
            <p className="font-bold mt-2">Total: ${order.totalOrderPrice}</p>

            <button
              onClick={() => router.push(`/orders/${order.id}`)}
              className="mt-4 w-full py-2 bg-black text-white rounded cursor-pointer transition"
            >
              View Invoice
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
    </>
  )
}
