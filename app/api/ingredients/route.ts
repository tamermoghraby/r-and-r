import { withAuth } from "@/lib/api/withAuth";
import prisma from "@/lib/prisma";
import { createIngredient, getIngredients } from "@/lib/services/ingredients";
import restaurantWhere from "@/lib/utils/restaurantScope";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (user, req: Request) => {
    const items = await getIngredients(user);
    const ingredients = await prisma.ingredient.findMany({
      where: restaurantWhere(user),
      orderBy: { name: "asc" },
    });
    return NextResponse.json(ingredients);
  },
  {
    roles: ["admin", "owner", "staff"],
    methods: ["GET"],
  }
);

export const POST = withAuth(
  async (user, req: Request) => {
    const body = await req.json();
    body.user = user;
    const item = await createIngredient(body);
    return NextResponse.json(item);
  },
  { roles: ["admin", "owner"], methods: ["POST"] }
);
