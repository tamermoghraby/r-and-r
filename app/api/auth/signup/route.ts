import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/lib/auth/session";

export async function POST(req: Request) {
  const { username, email, password, restaurantName } = await req.json();

  const passwordHash = await bcrypt.hash(password, 10);

  let restaurant = null;

  if (restaurantName) {
    restaurant = await prisma.restaurant.create({
      data: { name: restaurantName },
    });
  }
  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
      role: "owner",
      restaurantId: restaurant.id ?? undefined,
    },
  });

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.user = {
    id: user.id,
    role: user.role as any,
    restaurantId: restaurant.id ?? undefined,
  };
  await session.save();

  return NextResponse.json({ success: true });
}
