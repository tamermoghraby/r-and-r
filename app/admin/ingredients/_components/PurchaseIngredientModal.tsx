"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function PurchaseIngredientModal({
  ingredient,
  onClose,
  onSuccess,
}) {
  const [quantity, setQuantity] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [note, setNote] = useState("");

  const submit = async () => {
    await fetch("/api/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredientId: ingredient.id,
        quantity,
        totalCost,
        note,
      }),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 bg-gray-100 rounded-full"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-semibold">Purchase {ingredient.name}</h2>

        <div className="space-y-3">
          <input
            type="number"
            placeholder={`Quantity (${ingredient.unit})`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="Total cost"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Note (supplier, invoice, etc.)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-primary text-white py-2.5 rounded-xl"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
