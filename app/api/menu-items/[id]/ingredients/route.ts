import { NextRequest, NextResponse } from "next/server";
import {
  getMenuItemIngredients,
  updateMenuItemIngredients,
  updateMenuItemRecipe,
} from "@/lib/services/menu";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ingredients = await getMenuItemIngredients(params.id);
  return NextResponse.json(ingredients);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  // data.recipe: Array<{ ingredientId: string, quantityRequired: string | number }>
  await updateMenuItemRecipe(params.id, data.ingredients);
  return NextResponse.json({ success: true });
}
