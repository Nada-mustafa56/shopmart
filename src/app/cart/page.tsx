'use client'

import { useContext, useEffect, useState } from "react";
import {
  getProductsFromCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
  applyCouponToCart,
} from "@/api/cart.api";
import { CartProductType, CartType } from "@/types/cart.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartContext, CartContextType } from "@/context/cart.context";
import { toast } from "sonner";

export default function Cart() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [cartData, setCartData] = useState<CartType | null>(null);

  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const router = useRouter();
  const cart = useContext(CartContext) as CartContextType;

  async function fetchCart() {
    try {
      setLoading(true);
      const res = await getProductsFromCart();

      if (res?.data) {
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        setCartData(res.data);
        if (res.data._id) cart?.setCartId(res.data._id);

        const itemsCount = res.data.products.reduce(
          (sum: number, item: any) => sum + item.count,
          0
        );
        cart?.setNumOfCartItems(itemsCount);
      }
    } catch (error) {
      console.error(" Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQty = async (id: string, count: number) => {
    setActionLoading(id + "-inc");
    await updateProductQuantity(id, count + 1);
    await fetchCart();
    setActionLoading(null);
  };

  const decreaseQty = async (id: string, count: number) => {
    if (count <= 1) return;
    setActionLoading(id + "-dec");
    await updateProductQuantity(id, count - 1);
    await fetchCart();
    setActionLoading(null);
  };

  const removeProduct = async (id: string) => {
    setActionLoading(id + "-remove");
    await removeProductFromCart(id);
    await fetchCart();
    setActionLoading(null);
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear the cart?")) return;
    setActionLoading("clear");
    await clearCart();
    await fetchCart();
    setActionLoading(null);
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return setCouponMsg("Please enter a coupon code");
    setCouponLoading(true);
    setCouponMsg("Applying coupon...");

    const res = await applyCouponToCart(coupon.trim());

    if (res.status === "success") {
      setCouponMsg("Coupon applied successfully!");
      await fetchCart();
      toast.success("Coupon applied ");
    } else {
      setCouponMsg(res.message || "Failed to apply coupon");
      toast.error(res.message || "Failed to apply coupon ");
    }

    setCouponLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

        <div className="flex justify-between bg-white p-4 rounded-xl shadow mb-6">
          <p>Total Items: <b>{products.length}</b></p>
          <p className="text-red-600 font-bold">
            Total: {totalPrice} EGP
          </p>
        </div>

        {products.length > 0 && (
          <>
            <div className="flex gap-2 mt-4 items-center">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="border p-2 rounded-lg flex-1"
              />
              <Button
                onClick={handleApplyCoupon}
                disabled={couponLoading}
                className="bg-green-600"
              >
                {couponLoading ? "Applying..." : "Apply"}
              </Button>
            </div>

            {couponMsg && (
              <p className={`mt-2 text-sm ${couponMsg.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
                {couponMsg}
              </p>
            )}

            <div className="space-y-4 mt-4">
              {products.map(item => (
                <div
                  key={item.product._id}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm"
                >
                  <div className="flex gap-4">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold">{item.product.title}</h2>
                      <p className="text-red-600">{item.price} EGP</p>
                      <button
                        onClick={() => removeProduct(item.product._id)}
                        className="text-red-500 text-sm mt-2 flex gap-1"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      onClick={() => increaseQty(item.product._id, item.count)}
                    >
                      <Plus size={16} />
                    </Button>

                    <span className="px-4">{item.count}</span>

                    <Button
                      size="icon"
                      onClick={() => decreaseQty(item.product._id, item.count)}
                    >
                      <Minus size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {cart?.cartId && (
              <Button
                onClick={() => router.push(`/checkout/${cart.cartId}`)}
                className="w-full mt-6 bg-green-600"
              >
                Proceed to Checkout
              </Button>
            )}

            <Button
              onClick={handleClearCart}
              className="w-full mt-4 bg-red-600"
            >
              Clear Cart
            </Button>
          </>
        )}

        {products.length === 0 && (
          <div className="bg-white p-10 rounded-xl text-center mt-4">
            <p className="mb-4">Your cart is empty </p>
            <Button onClick={() => router.push("/products")}>
              Go Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
