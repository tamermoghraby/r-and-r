import { NextResponse } from "next/server";
import { adjustIngredientStock } from "@/lib/services/ingredients";
import { withAuth } from "@/lib/api/withAuth";

export const POST = withAuth(
  async (user, request: Request) => {
    try {
      const body = await request.json();

      const { ingredientId, changeAmount, reason, note, relatedOrderId } = body;

      if (!ingredientId || changeAmount == null) {
        return NextResponse.json(
          {
            success: false,
            error: "ingredientId and changeAmount are required",
          },
          { status: 400 }
        );
      }

      const amt = Number(changeAmount);
      if (isNaN(amt)) {
        return NextResponse.json(
          { success: false, error: "changeAmount must be a number" },
          { status: 400 }
        );
      }

      const response = await adjustIngredientStock(
        ingredientId,
        amt,
        reason,
        note,
        relatedOrderId,
        user
      );
      return NextResponse.json({ success: true, response });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { success: false, error: (e as Error).message },
        { status: 500 }
      );
    }
  },
  { roles: ["admin", "owner"] }
);
