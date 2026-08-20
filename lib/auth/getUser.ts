import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./session";

export async function getCurrentUser() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  console.log("Session in getCurrentUser:", session);
  return session.user;
}
