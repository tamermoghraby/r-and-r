"use client";

import { useTransition } from "react";

export default function AdjustStockForm({ ingredient, onClose }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await fetch("/api/ingredients/adjust-stock", {
        method: "POST",
        body: JSON.stringify({
          ingredientId: ingredient.id,
          changeAmount: Number(formData.get("amount")),
          reason: "adjustment",
          note: formData.get("note"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow w-96 space-y-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-lg font-semibold">Adjust Stock</h2>

        <input type="hidden" name="id" value={ingredient.id} />

        <div>
          <label>Amount (+ or -)</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            className="w-full border p-2 rounded"
            placeholder="e.g. -200"
            required
          />
        </div>

        <div>
          <label>Note (optional)</label>
          <input name="note" className="w-full border p-2 rounded" />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            type="button"
            className="px-3 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded">
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
