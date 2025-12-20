"use client";

import { useState } from "react";

export default function MenuItemForm({
  menuItem,
  onClose,
}: {
  menuItem?: any;
  onClose: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    await fetch(
      menuItem ? `/api/menu-items/${menuItem.id}` : "/api/menu-items",
      {
        method: menuItem ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow w-96 space-y-4 bg-white"
      >
        <h2 className="text-lg font-semibold">
          {menuItem ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <div>
          <label>Name</label>
          <input
            name="name"
            defaultValue={menuItem?.name}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={menuItem?.price}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Image path</label>
          <input
            name="image"
            type="string"
            defaultValue={menuItem?.image}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            name="description"
            defaultValue={menuItem?.description}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Type</label>
          <input
            name="type"
            defaultValue={menuItem?.type}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
