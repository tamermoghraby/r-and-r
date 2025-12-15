import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: { source: string; id: string } }
) {
  const { source, id } = params;

  if (source === "expense") {
    await prisma.expense.delete({ where: { id } });
  }

  if (source === "purchase") {
    await prisma.purchase.delete({ where: { id } });
  }

  return NextResponse.json({ success: true });
}
