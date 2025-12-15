import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const dateFilter =
    from || to
      ? {
          createdAt: {
            ...(from && { gte: new Date(from) }),
            ...(to && { lte: new Date(to) }),
          },
        }
      : undefined;

  /* -------------------- ORDERS -------------------- */

  const orders = await prisma.order.findMany({
    where: dateFilter,
    select: {
      totalPrice: true,
      createdAt: true,
      status: true,
    },
  });

  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + Number(o.totalPrice), 0);

  const ordersCount = orders.length;

  const avgOrderValue = ordersCount ? revenue / ordersCount : 0;

  /* -------------------- EXPENSES -------------------- */

  const expenses = await prisma.expense.findMany({
    where: dateFilter
      ? {
          expenseDate: dateFilter.createdAt,
        }
      : undefined,
  });

  const purchaseExpenses = await prisma.purchase.findMany({
    where: dateFilter,
    include: {
      ingredient: true,
    },
  });

  const expenseTotal = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const purchaseTotal = purchaseExpenses.reduce(
    (s, p) => s + Number(p.totalCost),
    0
  );

  const totalExpenses = expenseTotal + purchaseTotal;

  /* -------------------- PROFIT -------------------- */

  const profit = revenue - totalExpenses;

  /* -------------------- REVENUE BY DAY -------------------- */

  const revenueByDayMap = new Map<string, number>();

  orders.forEach((o) => {
    const day = o.createdAt.toISOString().split("T")[0];
    revenueByDayMap.set(
      day,
      (revenueByDayMap.get(day) || 0) + Number(o.totalPrice)
    );
  });

  const revenueByDay = Array.from(revenueByDayMap.entries()).map(
    ([date, amount]) => ({
      date,
      amount,
    })
  );

  /* -------------------- EXPENSES BY CATEGORY -------------------- */

  const expensesByCategoryMap = new Map<string, number>();

  expenses.forEach((e) => {
    const key = e.category || "Other";
    expensesByCategoryMap.set(
      key,
      (expensesByCategoryMap.get(key) || 0) + Number(e.amount)
    );
  });

  // Treat ingredient purchases as "Ingredients"
  expensesByCategoryMap.set(
    "Ingredients",
    (expensesByCategoryMap.get("Ingredients") || 0) + purchaseTotal
  );

  const expensesByCategory = Array.from(expensesByCategoryMap.entries()).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  /* -------------------- TOP INGREDIENT COSTS -------------------- */

  const ingredientCostMap = new Map<string, number>();

  purchaseExpenses.forEach((p) => {
    ingredientCostMap.set(
      p.ingredient.name,
      (ingredientCostMap.get(p.ingredient.name) || 0) + Number(p.totalCost)
    );
  });

  const topIngredients = Array.from(ingredientCostMap.entries())
    .map(([name, cost]) => ({ name, cost }))
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5);

  /* -------------------- RESPONSE -------------------- */

  return NextResponse.json({
    revenue,
    expenses: totalExpenses,
    profit,
    ordersCount,
    avgOrderValue,

    revenueByDay,
    expensesByCategory,
    topIngredients,
  });
}
