// app/services/menu.ts
import prisma from "../prisma";
import { Decimal } from "@prisma/client/runtime/index-browser";

export async function createMenuItem(data: {
  name: string;
  price: string | number;
  description?: string;
  image?: string;
  ingredients?: { ingredientId: string; quantityRequired: string | number }[];
}) {
  return prisma.menuItem.create({
    data: {
      name: data.name,
      price: new Decimal(data.price),
      description: data.description,
      image: data.image,
      recipe: {
        create:
          data.ingredients?.map((i) => ({
            ingredientId: i.ingredientId,
            quantityRequired: new Decimal(i.quantityRequired),
          })) ?? [],
      },
    },
    include: { recipe: true },
  });
}

export async function updateMenuItemIngredients(
  menuItemId: string,
  ingredients: { ingredientId: string; quantityRequired: string | number }[]
) {
  // Replace existing recipe
  return prisma.$transaction(async (tx) => {
    await tx.menuItemIngredient.deleteMany({ where: { menuItemId } });
    const created = await tx.menuItemIngredient.createMany({
      data: ingredients.map((i) => ({
        menuItemId,
        ingredientId: i.ingredientId,
        quantityRequired: new Decimal(i.quantityRequired).toString(),
      })),
    });
    return created;
  });
}
