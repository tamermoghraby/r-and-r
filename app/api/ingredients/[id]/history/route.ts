import { withAuth } from "@/lib/api/withAuth";
import prisma from "@/lib/prisma";
import restaurantWhere from "@/lib/utils/restaurantScope";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(
  async (user, _, { params }: any) => {
    const history = await prisma.ingredientStockHistory.findMany({
      where: {
        ingredientId: params.id,
        ingredient: restaurantWhere(user),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(history);
  },
  { roles: ["admin", "owner", "staff"] }
);
