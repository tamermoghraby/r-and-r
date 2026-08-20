// lib/api/withAuth.ts
import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth/requireAuth";

type Role = "admin" | "owner" | "staff";
type Method = "GET" | "POST" | "PUT" | "DELETE";

interface AuthOptions {
  roles?: Role[];
  methods?: Method[];
}

type RouteContext = {
  params?: Record<string, string>;
};

type AuthHandler = (
  user: any,
  req: Request,
  context: RouteContext
) => Promise<NextResponse>;

export function withAuth(handler: AuthHandler, options: AuthOptions = {}) {
  return async (req: Request, context: RouteContext) => {
    try {
      const user = await requireApiAuth();

      // Method restriction
      if (options.methods && !options.methods.includes(req.method as Method)) {
        return NextResponse.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      // Role restriction
      if (options.roles && !options.roles.includes(user.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      return await handler(user, req, context);
    } catch (e: any) {
      if (e.message === "UNAUTHORIZED") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      console.error(e);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  };
}
