"use client";

import { useState } from "react";
import IngredientForm from "./IngredientForm";
import AdjustStockForm from "./AdjustStockForm";
import IngredientHistory from "./IngredientHistory";

export default function IngredientList({ ingredients: initialIngredients }) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [selected, setSelected] = useState(null);
  const [stockTarget, setStockTarget] = useState(null);
  const [historyTarget, setHistoryTarget] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // Helper to refresh ingredient after create/edit/stock adjustment
  const refreshIngredient = async () => {
    const res = await fetch("/api/ingredients");
    const data = await res.json();
    setIngredients(data);
  };

  return (
    <div>
      <button
        className="bg-primary text-white px-3 py-2 rounded mb-4"
        onClick={() => setShowCreate(true)}
      >
        + Add Ingredient
      </button>

      {showCreate && (
        <IngredientForm
          onClose={async () => {
            setShowCreate(false);
            await refreshIngredient();
          }}
        />
      )}

      {selected && (
        <IngredientForm
          ingredient={selected}
          onClose={async () => {
            setSelected(null);
            await refreshIngredient();
          }}
        />
      )}

      {stockTarget && (
        <AdjustStockForm
          ingredient={stockTarget}
          onClose={async () => {
            setStockTarget(null);
            await refreshIngredient();
          }}
        />
      )}

      {historyTarget && (
        <IngredientHistory
          ingredient={historyTarget}
          onClose={() => setHistoryTarget(null)}
        />
      )}

      <div className="rounded shadow divide-y space-y-4">
        {ingredients.map((ing) => (
          <div
            key={ing.id}
            className="bg-gray-300 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <strong>{ing.name}</strong>
              <div className="text-gray-600 text-sm">
                {ing.currentQuantity} {ing.unit}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-sm bg-gray-200 rounded"
                onClick={() => setSelected(ing)}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 text-sm bg-yellow-300 rounded"
                onClick={() => setStockTarget(ing)}
              >
                Adjust Stock
              </button>

              <button
                className="px-3 py-1 text-sm bg-blue-200 rounded"
                onClick={() => setHistoryTarget(ing)}
              >
                History
              </button>

              <button
                className="px-3 py-1 text-sm bg-red-500 rounded"
                onClick={async () => {
                  if (
                    confirm(
                      `Are you sure you want to delete ingredient "${ing.name}"? This action cannot be undone.`
                    )
                  ) {
                    await fetch(`/api/ingredients/${ing.id}`, {
                      method: "DELETE",
                    });
                    await refreshIngredient(); // Refresh after deletion
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
