import { withAuth } from "@/lib/api/withAuth";
import prisma from "@/lib/prisma";
import { createMenuItem, getAllMenuItems } from "@/lib/services/menu";
import restaurantWhere from "@/lib/utils/restaurantScope";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async (user, req: NextRequest) => {
  const items = await prisma.menuItem.findMany({
    where: { ...restaurantWhere(user) },
    include: { recipe: { include: { ingredient: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
});

export const POST = withAuth(async (user, req: NextRequest) => {
  const body = await req.json();
  body.user = user;
  const item = await createMenuItem(body);
  return NextResponse.json(item);
});
