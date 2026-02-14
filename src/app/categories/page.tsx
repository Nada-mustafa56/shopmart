import CategoryCard from "@/app/_components/CategoryCard/CategoryCard";
import ErrorPage from "./error";

async function getCategories() {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      { next: { revalidate: 60 } } 
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch (err) {
    return null;
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  if (!categories || categories.length === 0) return <ErrorPage />;

  return (
    <>
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat: any) => (
          <CategoryCard key={cat._id} category={cat} />
        ))}
      </div>
    </div>
    </>
  )
}
