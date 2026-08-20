import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/api/withAuth";
import restaurantWhere from "@/lib/utils/restaurantScope";

export const DELETE = withAuth(
  async (
    user,
    _req: Request,
    { params }: { params: { source: string; id: string } }
  ) => {
    const { source, id } = params;

    if (source === "expense") {
      await prisma.expense.delete({ where: { id, ...restaurantWhere(user) } });
    }

    if (source === "purchase") {
      await prisma.purchase.delete({ where: { id, ...restaurantWhere(user) } });
    }

    return NextResponse.json({ success: true });
  },
  { roles: ["admin", "owner"] }
);
