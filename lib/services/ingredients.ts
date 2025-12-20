// lib/services/ingredients.ts

import prisma from "@/lib/prisma";
import restaurantWhere from "../utils/restaurantScope";

export const getIngredients = async (user) => {
  return await prisma.ingredient.findMany({
    where: { restaurantId: user.restaurantId },
  });
};

export const getIngredientById = async (id: string) => {
  return await prisma.ingredient.findUnique({ where: { id } });
};

export const deleteIngredient = async (id: string) => {
  return await prisma.ingredient.delete({ where: { id } });
};

export async function createIngredient(data: {
  name: string;
  unit: string;
  initialQuantity?: string | number;
  costPerUnit?: string | number;
  user: { restaurantId: string };
}) {
  const q = data.initialQuantity ?? 0;
  const cost = data.costPerUnit ?? 0;
  return prisma.ingredient.create({
    data: {
      restaurantId: data.user.restaurantId,
      name: data.name,
      unit: data.unit,
      currentQuantity: q,
      costPerUnit: cost,
      stockHistory: {
        create: {
          changeAmount: q,
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
  relatedOrderId?: string,
  user?: any
) {
  const amt = changeAmount;
  return prisma.$transaction(async (tx) => {
    const ing = await tx.ingredient.update({
      where: { id: ingredientId, ...restaurantWhere(user.restaurantId) },
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
