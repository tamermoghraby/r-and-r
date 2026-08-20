import prisma from "@/lib/prisma";

export async function GET(_: Request) {
  const ingredientStockHistory = await prisma.ingredientStockHistory.findMany(
    {}
  );
  return new Response(JSON.stringify(ingredientStockHistory), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
