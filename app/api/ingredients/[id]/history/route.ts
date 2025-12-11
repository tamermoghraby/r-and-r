import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const history = await prisma.ingredientStockHistory.findMany({
      where: { ingredientId: id },
      orderBy: { createdAt: "desc" }, // newest first
    });

    console.log("Fetched ingredient history:", history);

    return NextResponse.json(history, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch ingredient history:", err);
    return NextResponse.json(
      { error: "Failed to fetch ingredient history" },
      { status: 500 }
    );
  }
}
