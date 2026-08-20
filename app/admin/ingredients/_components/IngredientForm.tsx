"use client";

import { useTransition } from "react";

export default function IngredientForm({
  ingredient,
  onClose,
}: {
  ingredient?: any;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(
      "Submitting form data:",
      Object.fromEntries(formData.entries())
    );

    startTransition(async () => {
      if (ingredient) {
        await fetch(`/api/ingredients/${ingredient.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: formData.get("name"),
            unit: formData.get("unit"),
            costPerUnit: formData.get("costPerUnit"),
          }),
          headers: { "Content-Type": "application/json" },
        });
        onClose();
        return;
      } else {
        await fetch("/api/ingredients", {
          method: "POST",
          body: JSON.stringify({
            name: formData.get("name"),
            unit: formData.get("unit"),
            initialQuantity: ingredient
              ? undefined
              : parseFloat(formData.get("initialQuantity") as string),
            costPerUnit: ingredient
              ? undefined
              : parseFloat(formData.get("costPerUnit") as string),
          }),
          headers: { "Content-Type": "application/json" },
        });
      }

      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="p-6 rounded shadow w-96 space-y-4 bg-gray-300"
      >
        <h2 className="text-lg font-semibold">
          {ingredient ? "Edit Ingredient" : "Add Ingredient"}
        </h2>

        {ingredient && <input type="hidden" name="id" value={ingredient.id} />}

        <div>
          <label>Name</label>
          <input
            name="name"
            defaultValue={ingredient?.name}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Unit (g, ml, pcs...)</label>
          <input
            name="unit"
            defaultValue={ingredient?.unit}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Cost Per Unit</label>
          <input
            name="costPerUnit"
            type="number"
            step="0.01"
            defaultValue={ingredient?.costPerUnit || "0"}
            className="w-full border p-2 rounded"
          />
        </div>

        {!ingredient && (
          <>
            <div>
              <label>Initial Quantity</label>
              <input
                name="initialQuantity"
                type="number"
                step="0.01"
                defaultValue="0"
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 bg-gray-200 rounded"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
