import IngredientList from "./_components/IngredientList";
import { cookies } from "next/headers";

export default async function IngredientsPage() {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ingredients`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const ingredients = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ingredients</h1>
      <IngredientList ingredients={ingredients} />
    </div>
  );
}
