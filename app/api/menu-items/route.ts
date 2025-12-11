import { createMenuItem, getAllMenuItems } from "@/lib/services/menu";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const items = await getAllMenuItems();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await createMenuItem(body);
  return NextResponse.json(item);
}
