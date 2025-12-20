import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createOrder } from "@/lib/services/orders";
import { withAuth } from "@/lib/api/withAuth";

export const GET = withAuth(async (user, req: Request) => {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: any = {};
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) where.createdAt.lte = new Date(to);
  }

  where.restaurantId = user.restaurantId;

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  return NextResponse.json(orders);
});

export async function POST(req: Request) {
  const body = await req.json();
  const note = body.note || "";
  const order = await createOrder(body.items, note);
  return NextResponse.json(order);
}
