import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: { menuItem: true },
      },
    },
  });

  return NextResponse.json(order);
}

/* UPDATE order (status, note) */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      status: body.status,
      note: body.note,
    },
  });

  return NextResponse.json(order);
}

/* DELETE order */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  // Delete order item first due to foreign key constraint
  await prisma.orderItem.deleteMany({
    where: { orderId: params.id },
  });

  await prisma.order.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
