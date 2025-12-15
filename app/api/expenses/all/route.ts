import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const category = searchParams.get("category");

  const dateFilter: any = {};
  if (from) dateFilter.gte = new Date(from);
  if (to) dateFilter.lte = new Date(to);

  /** Manual expenses */
  const expenses = await prisma.expense.findMany({
    where: {
      ...(Object.keys(dateFilter).length && {
        expenseDate: dateFilter,
      }),
      ...(category &&
        category !== "All" &&
        category !== "Ingredients" && {
          category,
        }),
    },
  });

  /** Ingredient purchases */
  const purchases = await prisma.purchase.findMany({
    where: {
      ...(Object.keys(dateFilter).length && {
        createdAt: dateFilter,
      }),
      ...(category === "Ingredients" && {}),
    },
    include: {
      ingredient: true,
    },
  });

  /** Normalize */
  const normalizedExpenses = [
    ...expenses.map((e) => ({
      id: e.id,
      source: "expense",
      description: e.description,
      category: e.category || "Other",
      amount: Number(e.amount),
      date: e.expenseDate,
    })),

    ...purchases.map((p) => ({
      id: p.id,
      source: "purchase",
      description: `Ingredient purchase: ${p.ingredient.name}`,
      category: "Ingredients",
      amount: Number(p.totalCost),
      date: p.createdAt,
    })),
  ];

  /** Sort newest first */
  normalizedExpenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return NextResponse.json(normalizedExpenses);
}
