// app/services/menu.ts
"use server";
import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
const Decimal = Prisma.Decimal;

export async function getAllMenuItems() {
  return prisma.menuItem.findMany({
    include: { recipe: { include: { ingredient: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMenuItem(id: string) {
  return prisma.menuItem.findUnique({
    where: { id },
    include: { recipe: { include: { ingredient: true } } },
  });
}

export async function createMenuItem(data: {
  name: string;
  price: string | number;
  description?: string;
  image?: string;
  ingredients?: { ingredientId: string; quantityRequired: string | number }[];
  user?: { restaurantId: string };
}) {
  return prisma.menuItem.create({
    data: {
      restaurantId: data.user?.restaurantId || "",
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

export async function updateMenuItem(
  id: string,
  data: {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    type?: string;
    recipe?: { ingredientId: string; quantityRequired: number }[];
  }
) {
  return prisma.$transaction(async (tx) => {
    // Update main menu item
    const menuItem = await tx.menuItem.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
        type: data.type,
      },
    });

    if (data.recipe) {
      // Delete old recipe
      await tx.menuItemIngredient.deleteMany({ where: { menuItemId: id } });
      // Create new recipe
      await tx.menuItemIngredient.createMany({
        data: data.recipe.map((r) => ({ menuItemId: id, ...r })),
      });
    }

    return menuItem;
  });
}

// Update recipe for a menu item
export async function updateMenuItemRecipe(
  menuItemId: string,
  recipe: { ingredientId: string; quantityRequired: string | number }[]
) {
  // Delete old recipe
  await prisma.menuItemIngredient.deleteMany({ where: { menuItemId } });

  // Add new recipe
  return prisma.menuItemIngredient.createMany({
    data: recipe.map((r) => ({
      menuItemId,
      ingredientId: r.ingredientId,
      quantityRequired: new Decimal(r.quantityRequired),
    })),
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

export async function deleteMenuItem(id: string) {
  return prisma.menuItem.delete({ where: { id } });
}

export async function getMenuItemIngredients(id: string) {
  return prisma.menuItemIngredient.findMany({
    where: { menuItemId: id },
    include: { ingredient: true },
  });
}
