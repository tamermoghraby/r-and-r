import { createIngredient, getIngredients } from "@/lib/services/ingredients";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await getIngredients();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const item = await createIngredient(body);
  return NextResponse.json(item);
}
