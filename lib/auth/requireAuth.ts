import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./session";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user) {
    redirect("/login");
  }

  return session.user;
}

export async function requireApiAuth() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.user) {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}
