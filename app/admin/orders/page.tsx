"use client";

import { useEffect, useState } from "react";
import CreateOrderModal from "./_components/CreateOrderModal";
import { Clock, ChevronDown, ChevronUp, FileText, Trash2 } from "lucide-react";

/* ---------------- TYPES ---------------- */

type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: string;
  menuItem: {
    name: string;
  };
};

type Order = {
  id: string;
  status: "pending" | "completed" | "cancelled";
  note?: string | null;
  totalPrice: string;
  createdAt: string;
  items: OrderItem[];
};

/* ---------------- PAGE ---------------- */

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  /* -------- FETCH -------- */

  const fetchOrders = async () => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const res = await fetch(`/api/orders?${params.toString()}`);
    setOrders(await res.json());
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* -------- ANALYTICS -------- */

  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + Number(o.totalPrice), 0);

  /* -------- ACTIONS -------- */

  const updateOrder = async (
    id: string,
    data: Partial<{ status: Order["status"]; note: string }>
  ) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    fetchOrders();
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order permanently?")) return;

    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  /* ---------------- RENDER ---------------- */

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
          className="bg-primary text-white px-5 py-2.5 rounded-xl shadow-md hover:opacity-90"
        >
          + New Order
        </button>
      </header>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Stat
          label="Total Orders"
          value={orders.filter((o) => o.status === "completed").length}
          accent="bg-blue-500"
          orders={orders}
        />
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
          const isLocked = order.status === "completed";

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

                    <StatusSelect
                      status={order.status}
                      disabled={false}
                      onChange={(status) => updateOrder(order.id, { status })}
                    />
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
                  <OrderNoteEditor
                    note={order.note}
                    onSave={(note) => updateOrder(order.id, { note })}
                  />

                  {/* ACTIONS */}
                  {!isLocked && (
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="flex items-center gap-2 text-sm text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete Order
                    </button>
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

/* ---------------- COMPONENTS ---------------- */

function Stat({ label, value, accent, orders }: any) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm p-5 overflow-hidden">
      <div className={`absolute right-0 top-0 h-full w-1 ${accent}`} />
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>

      {/* If label is total orders, show orders length based on status */}
      {label === "Total Orders" && (
        <div className="flex text-sm justify-between items-center mt-4">
          <div className="relative">
            <div className="absolute bg-rose-600 text-xs text-white font-bold rounded-full px-1 -top-3 -right-2">
              {orders.filter((o: any) => o.status === "completed").length}
            </div>
            <p className="bg-green-400 text-white px-2 rounded-lg">completed</p>
          </div>
          <div className="relative">
            <div className="absolute bg-rose-600 text-xs text-white font-bold rounded-full px-1 -top-3 -right-2">
              {orders.filter((o: any) => o.status === "pending").length}
            </div>
            <p className="bg-primary text-white px-2 rounded-lg">pending</p>
          </div>
          <div className="relative">
            <div className="absolute bg-rose-600 text-xs text-white font-bold rounded-full px-1 -top-3 -right-2">
              {orders.filter((o: any) => o.status === "cancelled").length}
            </div>
            <p className="bg-red-400 text-white px-2 rounded-lg">cancelled</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DateFilter({ label, value, onChange }: any) {
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

function StatusSelect({
  status,
  onChange,
  disabled,
}: {
  status: string;
  onChange: (v: any) => void;
  disabled?: boolean;
}) {
  return (
    <select
      disabled={disabled}
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs border rounded-full px-2 py-0.5 text-white cursor-pointer ${
        status === "pending"
          ? "bg-primary"
          : status === "completed"
          ? "bg-green-400"
          : status === "cancelled"
          ? "bg-red-400"
          : "bg-white"
      } `}
    >
      <option className="bg-white text-black" value="pending">
        Pending
      </option>
      <option className="bg-white text-black" value="completed">
        Completed
      </option>
      <option className="bg-white text-black" value="cancelled">
        Cancelled
      </option>
    </select>
  );
}

function OrderNoteEditor({
  note,
  onSave,
}: {
  note?: string | null;
  onSave: (note: string) => void;
}) {
  const [value, setValue] = useState(note || "");

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-start text-sm">
        <FileText size={16} />
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          placeholder="Add note…"
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button onClick={() => onSave(value)} className="text-xs text-blue-600">
        Save note
      </button>
    </div>
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
