import prisma from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 bg-white shadow rounded-md">
            <div className="flex justify-between">
              <strong>Order #{order.id}</strong>
              <span>{order.createdAt.toLocaleString()}</span>
            </div>

            <div className="text-sm text-gray-600 mt-2">
              Items: {order.items.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
