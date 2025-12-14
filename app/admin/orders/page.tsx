"use client";

import { useEffect, useState } from "react";
import CreateOrderModal from "./_components/CreateOrderModal";
import { Clock, ChevronDown, ChevronUp, FileText } from "lucide-react";

type Order = any;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchOrders = async () => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const res = await fetch(`/api/orders?${params}`);
    setOrders(await res.json());
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalPrice), 0);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="flex items-center justify-between sticky top-0 bg-gray-50 z-10 py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-gray-500">
            Monitor daily sales and manage orders
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl shadow-md"
        >
          + New Order
        </button>
      </header>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Stat label="Total Orders" value={orders.length} accent="bg-blue-500" />
        <Stat
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          accent="bg-green-500"
        />
        <Stat
          label="Avg Order Value"
          value={
            orders.length
              ? `$${(totalRevenue / orders.length).toFixed(2)}`
              : "$0"
          }
          accent="bg-purple-500"
        />
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap gap-4 items-end">
        <DateFilter label="From" value={from} onChange={setFrom} />
        <DateFilter label="To" value={to} onChange={setTo} />

        <button
          onClick={fetchOrders}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Apply
        </button>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-4">
        {orders.length === 0 && <EmptyState />}

        {orders.map((order) => {
          const isOpen = expanded === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* SUMMARY */}
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      Order #{order.id.slice(-6)}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} />
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-green-600">
                    ${Number(order.totalPrice).toFixed(2)}
                  </span>
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              {/* DETAILS */}
              {isOpen && (
                <div className="border-t px-5 py-4 space-y-4 bg-gray-50">
                  {/* ITEMS */}
                  <div className="space-y-1 text-sm">
                    {order.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span>
                          {it.menuItem.name} × {it.quantity}
                        </span>
                        <span>
                          ${(Number(it.unitPrice) * it.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* NOTE */}
                  {order.note && (
                    <div className="flex gap-2 text-sm text-gray-700 bg-white p-3 rounded-xl border">
                      <FileText size={16} className="mt-0.5" />
                      <span>{order.note}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showCreate && (
        <CreateOrderModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchOrders}
        />
      )}
    </div>
  );
}

/* ----------------- SMALL COMPONENTS ----------------- */

function Stat({ label, value, accent }) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm p-5 overflow-hidden">
      <div className={`absolute right-0 top-0 h-full w-1 ${accent}`} />
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function DateFilter({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        map[status] || "bg-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 text-gray-500">
      <div className="text-lg font-medium">No orders found</div>
      <p className="text-sm mt-1">
        Try adjusting the date filters or create a new order
      </p>
    </div>
  );
}
