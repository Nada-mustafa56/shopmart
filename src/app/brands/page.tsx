import BrandCard from "@/app/_components/BrandCard/BrandCard";
import ErrorPage from "./error";

async function getBrands() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export default async function BrandsPage() {
  const brands = await getBrands();

  if (!brands || brands.length === 0) return <ErrorPage />;

  return (
    <>
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand: any) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
    </>
  )
}

