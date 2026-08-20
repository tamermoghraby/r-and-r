import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: "restaurant_admin_session",
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export type SessionUser = {
  id: string;
  role: "admin" | "owner" | "staff";
  restaurantId?: string;
};

export interface SessionData {
  user: SessionUser | null;
  username: string;
  restaurantId?: string;
  isLoggedIn: boolean;
}
