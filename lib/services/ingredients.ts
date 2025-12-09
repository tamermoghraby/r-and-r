// app/services/ingredients.ts
import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/index-browser";

export async function createIngredient(data: {
  name: string;
  unit: string;
  initialQuantity?: string | number;
  costPerUnit?: string | number;
}) {
  const q = data.initialQuantity ?? 0;
  const cost = data.costPerUnit ?? 0;
  return prisma.ingredient.create({
    data: {
      name: data.name,
      unit: data.unit,
      currentQuantity: new Decimal(q),
      costPerUnit: new Decimal(cost),
      stockHistory: {
        create: {
          changeAmount: new Decimal(q),
          reason: "initial_stock",
          note: "Initial quantity",
        },
      },
    },
  });
}

export async function adjustIngredientStock(
  ingredientId: string,
  changeAmount: string | number,
  reason = "adjustment",
  note?: string,
  relatedOrderId?: string
) {
  const amt = new Decimal(changeAmount);
  return prisma.$transaction(async (tx) => {
    const ing = await tx.ingredient.update({
      where: { id: ingredientId },
      data: {
        currentQuantity: { increment: amt },
      },
    });

    await tx.ingredientStockHistory.create({
      data: {
        ingredientId,
        changeAmount: amt,
        reason,
        note,
        relatedOrderId,
      },
    });

    return ing;
  });
}
