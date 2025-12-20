import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/lib/auth/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.user = {
    id: user.id,
    role: user.role as any,
    restaurantId: user.restaurantId ?? undefined,
  };
  await session.save();

  return NextResponse.json({ success: true });
}
