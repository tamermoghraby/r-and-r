import prisma from "@/lib/prisma";
import IngredientList from "./_components/IngredientList";

export default async function IngredientsPage() {
  function serializePrisma(data: any) {
    return JSON.parse(
      JSON.stringify(data, (_, value) =>
        typeof value === "object" &&
        value !== null &&
        value.constructor?.name === "Decimal"
          ? value.toNumber()
          : value
      )
    );
  }
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { name: "asc" },
  });

  //   await prisma.ingredient.create({
  //     data: {
  //       name: "Sugar Brown",
  //       unit: "grams",
  //       currentQuantity: 1000,
  //       costPerUnit: 0.02,
  //     },
  //   });

  const safeIngredients = serializePrisma(ingredients);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ingredients</h1>
      <IngredientList ingredients={safeIngredients} />
    </div>
  );
}
