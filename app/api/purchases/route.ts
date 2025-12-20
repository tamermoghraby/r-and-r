import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { adjustIngredientStock } from "@/lib/services/ingredients";
import { withAuth } from "@/lib/api/withAuth";

export const POST = withAuth(async (user, req: Request) => {
  try {
    const body = await req.json();
    const { ingredientId, quantity, totalCost, note } = body;

    if (!ingredientId || !quantity || !totalCost) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const qty = Number(quantity);
    const cost = Number(totalCost);

    if (qty <= 0 || cost <= 0) {
      return NextResponse.json(
        { error: "Quantity and cost must be positive" },
        { status: 400 }
      );
    }

    // 1️⃣ Create purchase
    const purchase = await prisma.purchase.create({
      data: {
        ingredientId,
        quantity: qty,
        totalCost: cost,
        note: note || null,
        restaurantId: user.restaurantId,
      },
    });

    // 2️⃣ Adjust stock (+)
    await adjustIngredientStock(
      ingredientId,
      qty,
      "purchase",
      note || "Ingredient purchase"
    );

    return NextResponse.json({ success: true, purchase });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
});

export async function GET() {
  const purchases = await prisma.purchase.findMany({
    include: { ingredient: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(purchases);
}
