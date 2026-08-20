import { NextRequest, NextResponse } from "next/server";
import {
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/services/menu";
import { withAuth } from "@/lib/api/withAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = await getMenuItem(params.id);
  return NextResponse.json(item);
}

export const PATCH = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const updated = await updateMenuItem(params.id, body);
    return NextResponse.json(updated);
  },
  { roles: ["admin", "owner"] }
);

export const DELETE = withAuth(
  async (user, req: NextRequest, { params }: { params: { id: string } }) => {
    await deleteMenuItem(params.id);
    return NextResponse.json({ success: true });
  },
  { roles: ["admin", "owner"] }
);
