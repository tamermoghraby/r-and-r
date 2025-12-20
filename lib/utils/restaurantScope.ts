// lib/utils/restaurantScope.ts
export default function restaurantWhere(user: any) {
  if (user.role === "admin") return {};
  return { restaurantId: user.restaurantId };
}
