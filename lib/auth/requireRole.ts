export async function requireRole(
  role: "admin" | "owner" | "staff",
  userRole: string
) {
  if (userRole !== role) {
    throw new Error("Access denied: Unauthorized role");
  }
}
