// app/services/orders.ts
import prisma from "../prisma";
import { Decimal } from "@prisma/client/runtime/index-browser";

type OrderItemInput = { menuItemId: string; quantity: number };

export async function createOrder(items: OrderItemInput[]) {
  if (!items || items.length === 0) throw new Error("No items");

  // Use a transaction: we must deduct ingredient stock atomically with order creation.
  return prisma.$transaction(async (tx) => {
    // 1) load menu items + their recipe
    const menuItemIds = items.map((i) => i.menuItemId);
    const menuItems = await tx.menuItem.findMany({
      where: { id: { in: menuItemIds } },
      include: { recipe: true },
    });

    // 2) compute total price and aggregate required ingredient totals
    let totalPrice = new Decimal(0);
    const ingredientUsageMap: Record<string, Decimal> = {};

    for (const it of items) {
      const mi = menuItems.find((m) => m.id === it.menuItemId);
      if (!mi) throw new Error("Menu item not found: " + it.menuItemId);
      totalPrice = totalPrice.add(new Decimal(mi.price).mul(it.quantity));
      // aggregate ingredient requirements
      for (const r of mi.recipe) {
        const required = new Decimal(r.quantityRequired).mul(it.quantity);
        if (!ingredientUsageMap[r.ingredientId])
          ingredientUsageMap[r.ingredientId] = new Decimal(0);
        ingredientUsageMap[r.ingredientId] =
          ingredientUsageMap[r.ingredientId].add(required);
      }
    }

    // 3) check stock sufficiency
    const ingredientIds = Object.keys(ingredientUsageMap);
    const ingredients = await tx.ingredient.findMany({
      where: { id: { in: ingredientIds } },
    });
    for (const ing of ingredients) {
      const needed = ingredientUsageMap[ing.id] ?? new Decimal(0);
      if (ing.currentQuantity.lt(needed)) {
        throw new Error(
          `Not enough stock for ${ing.name}. Needed ${needed.toString()} ${
            ing.unit
          } but have ${ing.currentQuantity.toString()}`
        );
      }
    }

    // 4) create order
    const createdOrder = await tx.order.create({
      data: {
        totalPrice: totalPrice,
        status: "completed",
        items: {
          create: items.map((it) => ({
            menuItemId: it.menuItemId,
            quantity: it.quantity,
            unitPrice: menuItems.find((m) => m.id === it.menuItemId)!.price,
          })),
        },
      },
      include: { items: true },
    });

    // 5) deduct ingredients and create stock history rows
    for (const [ingredientId, amt] of Object.entries(ingredientUsageMap)) {
      await tx.ingredient.update({
        where: { id: ingredientId },
        data: { currentQuantity: { decrement: amt } },
      });

      await tx.ingredientStockHistory.create({
        data: {
          ingredientId,
          changeAmount: amt.mul(-1),
          reason: "order_deduction",
          relatedOrderId: createdOrder.id,
          note: `Deduct for order ${createdOrder.id}`,
        },
      });
    }

    return createdOrder;
  });
}
