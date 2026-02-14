'use server'
import getMyToken from "@/utilities/GetMyToken";
export default async function addProductToCart(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      return { status: "error", message: "Login to add to cart" };
    }
    const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: {
         token :`${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in addProductToCart:", error);
    return { status: "error", message: "Something went wrong" };
  }
}
export async function getProductsFromCart(){
    const token = await getMyToken();
    
   const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart' , {
        method : 'GET' ,
        headers : {
             token :`${token}`,
        }
    })

    const data = await res.json()
    return data ;
}
export async function removeProductFromCart(id: string) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        token :`${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
}
export async function updateProductQuantity(id: string, count: number) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        count,
      }),
      headers: {
        token :`${token}` ,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
}
export async function clearCart() {
  const token = await getMyToken();

  const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
    method: "DELETE",
    headers: {
       token :`${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
export async function applyCouponToCart(couponCode: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      return { status: "error", message: "Login to apply coupon" };
    }

    const res = await fetch('https://ecommerce.routemisr.com/api/v2/cart/applyCoupon', {
      method: "PUT",
      body: JSON.stringify({ coupon: couponCode }),
      headers: {
        token: `${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { status: "error", message: data.message || "Failed to apply coupon" };
    }

    return { status: "success", data };
  } catch (error) {
    console.error("Error applying coupon:", error);
    return { status: "error", message: "Something went wrong" };
  }
}
