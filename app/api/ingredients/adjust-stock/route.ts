import { NextResponse } from "next/server";
import { adjustIngredientStock } from "@/lib/services/ingredients";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { ingredientId, changeAmount, reason, note, relatedOrderId } = body;

    if (!ingredientId || changeAmount == null) {
      return NextResponse.json(
        { success: false, error: "ingredientId and changeAmount are required" },
        { status: 400 }
      );
    }

    const amt = Number(changeAmount);
    if (isNaN(amt)) {
      return NextResponse.json(
        { success: false, error: "changeAmount must be a number" },
        { status: 400 }
      );
    }

    const response = await adjustIngredientStock(
      ingredientId,
      amt,
      reason,
      note,
      relatedOrderId
    );

    // const ingredient = await prisma.$transaction(async (tx) => {
    //   const ing = await tx.ingredient.update({
    //     where: { id: ingredientId },
    //     data: { currentQuantity: { increment: amt } },
    //   });

    //   await tx.ingredientStockHistory.create({
    //     data: {
    //       ingredientId,
    //       changeAmount: amt,
    //       reason: reason || "adjustment",
    //       note: note || null,
    //       relatedOrderId: relatedOrderId || null,
    //     },
    //   });

    //   return ing;
    // });

    return NextResponse.json({ success: true, response });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
