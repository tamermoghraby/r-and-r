import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/api/withAuth";
import restaurantWhere from "@/lib/utils/restaurantScope";

export const GET = withAuth(
  async (user, req: Request) => {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const category = searchParams.get("category");

    const where: any = {};
    if (from || to) {
      where.expenseDate = {};
      if (from) where.expenseDate.gte = new Date(from);
      if (to) where.expenseDate.lte = new Date(to);
    }
    if (category && category !== "All") {
      where.category = category;
    }

    const expenses = await prisma.expense.findMany({
      where: { ...where, ...restaurantWhere(user) },
      orderBy: { expenseDate: "desc" },
    });

    return NextResponse.json(expenses);
  },
  { roles: ["admin", "owner"] }
);

export const POST = withAuth(async (user, req: Request) => {
  const body = await req.json();
  const { description, amount, category, expenseDate } = body;

  if (!description || !amount) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const expense = await prisma.expense.create({
    data: {
      description,
      amount,
      category,
      expenseDate: expenseDate ? new Date(expenseDate) : undefined,
      restaurantId: user.restaurantId,
    },
  });

  return NextResponse.json(expense);
});
