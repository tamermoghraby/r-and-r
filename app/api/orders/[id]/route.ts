import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/api/withAuth";
import restaurantWhere from "@/lib/utils/restaurantScope";

export const GET = withAuth(
  async (_user, _req: Request, { params }: { params: { id: string } }) => {
    const order = await prisma.order.findUnique({
      where: { id: params.id, ...restaurantWhere(_user) },
      include: {
        items: {
          include: { menuItem: true },
        },
      },
    });

    return NextResponse.json(order);
  },
  { roles: ["admin", "owner", "staff"] }
);

/* UPDATE order (status, note) */
export const PATCH = withAuth(
  async (user, req: Request, { params }: { params: { id: string } }) => {
    const body = await req.json();

    const order = await prisma.order.update({
      where: { id: params.id, ...restaurantWhere(user) },
      data: {
        status: body.status,
        note: body.note,
      },
    });

    return NextResponse.json(order);
  },
  { roles: ["admin", "owner", "staff"] }
);

/* DELETE order */
export const DELETE = withAuth(
  async (user, _req: Request, { params }: { params: { id: string } }) => {
    // Delete order item first due to foreign key constraint
    await prisma.orderItem.deleteMany({
      where: { orderId: params.id },
    });

    await prisma.order.delete({
      where: { id: params.id, ...restaurantWhere(user) },
    });

    return NextResponse.json({ success: true });
  }
);
