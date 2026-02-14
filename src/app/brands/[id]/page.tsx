import BrandDetails from "@/app/_components/BrandDetails/BrandDetails";
import ErrorPage from "../error";

async function getBrand(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export default async function BrandPage({ params }: { params: { id: string } }) {
  const brand = await getBrand(params.id);

  if (!brand) return <ErrorPage />;

  return <BrandDetails brand={brand} />;
}
