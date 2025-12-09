// app/services/purchases.ts
import { Decimal } from "@prisma/client/runtime/index-browser";
import prisma from "../prisma";

export async function addPurchase(
  ingredientId: string,
  quantity: string | number,
  totalCost: string | number,
  note?: string
) {
  const q = new Decimal(quantity);
  const cost = new Decimal(totalCost);

  return prisma.$transaction(async (tx) => {
    // increase currentQuantity
    const ing = await tx.ingredient.update({
      where: { id: ingredientId },
      data: { currentQuantity: { increment: q }, costPerUnit: cost.div(q) },
    });

    await tx.purchase.create({
      data: {
        ingredientId,
        quantity: q,
        totalCost: cost,
        note,
      },
    });

    await tx.ingredientStockHistory.create({
      data: {
        ingredientId,
        changeAmount: q,
        reason: "purchase",
        note,
      },
    });

    return ing;
  });
}
