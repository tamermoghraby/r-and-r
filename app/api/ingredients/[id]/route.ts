import prisma from "@/lib/prisma";
import {
  deleteIngredient,
  getIngredientById,
} from "@/lib/services/ingredients";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await getIngredientById(params.id);
  return NextResponse.json(item);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = await prisma.ingredient.update({
    where: { id: params.id },
    data: {
      name: data.name,
      unit: data.unit,
      costPerUnit: data.costPerUnit,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.ingredientStockHistory.deleteMany({});
  await deleteIngredient(params.id);
  return NextResponse.json({ success: true });
}
