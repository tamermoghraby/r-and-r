import { withAuth } from "@/lib/api/withAuth";
import prisma from "@/lib/prisma";
import restaurantWhere from "@/lib/utils/restaurantScope";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (user, _, { params }: any) => {
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id: params.id,
        ...restaurantWhere(user),
      },
    });

    if (!ingredient)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(ingredient);
  },
  { roles: ["admin", "owner", "staff"] }
);

export const PUT = withAuth(
  async (user, req, { params }: any) => {
    const data = await req.json();

    const updated = await prisma.ingredient.updateMany({
      where: {
        id: params.id,
        ...restaurantWhere(user),
      },
      data,
    });

    return NextResponse.json(updated);
  },
  { roles: ["admin", "owner"] }
);

export const DELETE = withAuth(
  async (user, _, { params }: any) => {
    await prisma.ingredient.deleteMany({
      where: {
        id: params.id,
        ...restaurantWhere(user),
      },
    });

    return NextResponse.json({ success: true });
  },
  { roles: ["admin", "owner"] }
);
