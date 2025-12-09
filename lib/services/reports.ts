// app/services/reports.ts
import prisma from "@/lib/prisma";

export async function getIncome(start: Date, end: Date) {
  return prisma.order.aggregate({
    _sum: { totalPrice: true },
    where: { orderDate: { gte: start, lte: end }, status: "completed" },
  });
}

export async function getExpenses(start: Date, end: Date) {
  // combine direct expenses + purchases
  const expensesSum = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: { expenseDate: { gte: start, lte: end } },
  });

  const purchasesSum = await prisma.purchase.aggregate({
    _sum: { totalCost: true },
    where: { createdAt: { gte: start, lte: end } },
  });

  return {
    expenses: expensesSum._sum.amount ?? 0,
    purchases: purchasesSum._sum.totalCost ?? 0,
  };
}
