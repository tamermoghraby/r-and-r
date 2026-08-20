import { NextRequest, NextResponse } from "next/server";
import {
  getMenuItemIngredients,
  updateMenuItemIngredients,
  updateMenuItemRecipe,
} from "@/lib/services/menu";
import { withAuth } from "@/lib/api/withAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ingredients = await getMenuItemIngredients(params.id);
  return NextResponse.json(ingredients);
}

export const PATCH = withAuth(
  async (user, req: Request, { params }: { params: { id: string } }) => {
    const data = await req.json();
    // data.recipe: Array<{ ingredientId: string, quantityRequired: string | number }>
    await updateMenuItemRecipe(params.id, data.ingredients);
    return NextResponse.json({ success: true });
  },
  { roles: ["admin", "owner"] }
);
