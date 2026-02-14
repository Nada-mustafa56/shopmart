import CategoryDetails from "@/app/_components/CategoryDetails/CategoryDetails";
import ErrorPage from "../error";

async function getCategory(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);

  if (!category) return <ErrorPage />;

  return <CategoryDetails category={category} />;
}
