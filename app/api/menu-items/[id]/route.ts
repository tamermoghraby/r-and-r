import { NextRequest, NextResponse } from "next/server";
import {
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/services/menu";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = await getMenuItem(params.id);
  return NextResponse.json(item);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await updateMenuItem(params.id, body);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await deleteMenuItem(params.id);
  return NextResponse.json({ success: true });
}
