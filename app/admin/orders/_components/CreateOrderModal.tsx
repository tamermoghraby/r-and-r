"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/Toast";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { X, Minus, Plus, Trash2 } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  type?: string;
};

export default function CreateOrderModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [note, setNote] = useState("");

  const toast = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetch(
      "/api/menu-items",
      // cash the menu items to avoid refetching on every open
      {
        next: { revalidate: 60 },
      }
    )
      .then((r) => r.json())
      .then(setMenuItems);
  }, []);

  /* ---------------- CART ACTIONS ---------------- */

  const addItem = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const decreaseItem = (id: string) =>
    setCart((c) => {
      const qty = (c[id] || 0) - 1;
      if (qty <= 0) {
        const copy = { ...c };
        delete copy[id];
        return copy;
      }
      return { ...c, [id]: qty };
    });

  const removeItem = (id: string) =>
    setCart((c) => {
      const copy = { ...c };
      delete copy[id];
      return copy;
    });

  /* ---------------- FILTERS ---------------- */

  const categories = useMemo(() => {
    const types = menuItems.map((m) => m.type).filter(Boolean) as string[];
    const uniqueTypes: string[] = [];
    types.forEach((t) => {
      if (!uniqueTypes.includes(t)) uniqueTypes.push(t);
    });
    return ["All", ...uniqueTypes];
  }, [menuItems]);

  const filtered = menuItems.filter(
    (m) =>
      (category === "All" || m.type === category) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TOTAL ---------------- */

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  /* ---------------- SUBMIT ---------------- */

  const submit = async () => {
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        note,
        items: Object.entries(cart).map(([menuItemId, quantity]) => ({
          menuItemId,
          quantity,
        })),
      }),
    });

    toast.success("Order created successfully ✅");
    onCreated();
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/40 z-50 ${
        isMobile ? "flex items-end" : "flex items-center justify-center"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full ${
          isMobile ? "h-[90%] rounded-t-3xl" : "h-screen w-full rounded-2xl"
        } grid grid-cols-3 overflow-hidden relative`}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 rounded-full p-2"
        >
          <X size={18} />
        </button>

        {/* MENU */}
        <div className="col-span-2 p-6 space-y-4 overflow-y-auto">
          <input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-2"
          />

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === c ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((m) => {
              const qty = cart[m.id] || 0;

              return (
                <button
                  key={m.id}
                  onClick={() => addItem(m.id)}
                  className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img src={m.image} className="h-32 w-full object-cover" />

                  {qty > 0 && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {qty}
                    </div>
                  )}

                  <div className="p-3 text-left">
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-sm text-gray-500">${m.price}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CART */}
        <div className="border-l p-5 flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Order</h3>

          <div className="flex-1 space-y-3 overflow-y-auto">
            {Object.entries(cart).map(([id, qty]) => {
              const item = menuItems.find((m) => m.id === id);
              if (!item) return null;

              return (
                <div
                  key={id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      ${item.price} × {qty}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseItem(id)}
                      className="p-1 bg-white rounded"
                    >
                      <Minus size={14} />
                    </button>
                    <button
                      onClick={() => addItem(id)}
                      className="p-1 bg-white rounded"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(id)}
                      className="p-1 bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}

            {Object.keys(cart).length === 0 && (
              <div className="text-sm text-gray-500">
                👆 Tap menu items to add them to the order
              </div>
            )}
          </div>

          {/* NOTE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Order note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. No onions, takeaway, urgent..."
              className="w-full border rounded-xl px-3 py-2 text-sm resize-none outline-none"
              rows={3}
            />
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              disabled={total === 0}
              onClick={submit}
              className="w-full bg-primary text-white py-3 rounded-xl disabled:opacity-50"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
