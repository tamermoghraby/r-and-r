"use client";

import { useEffect, useState } from "react";
import MenuItemForm from "./MenuItemForm";
import MenuItemRecipeForm from "./MenuRecipeForm";
import Image from "next/image";

export default function MenuItemList() {
  const [menuItems, setMenuItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editRecipeTarget, setEditRecipeTarget] = useState(null);

  const fetchMenuItems = async () => {
    const res = await fetch("/api/menu-items");
    const data = await res.json();
    setMenuItems(data);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      await fetch(`/api/menu-items/${id}`, { method: "DELETE" });
      fetchMenuItems();
    }
  };

  return (
    <div>
      <button
        className="bg-primary text-white px-3 py-2 rounded mb-4"
        onClick={() => setShowCreate(true)}
      >
        + Add Menu Item
      </button>

      {showCreate && (
        <MenuItemForm
          onClose={() => {
            setShowCreate(false);
            fetchMenuItems();
          }}
        />
      )}

      {selected && (
        <MenuItemForm
          menuItem={selected}
          onClose={() => {
            setSelected(null);
            fetchMenuItems();
          }}
        />
      )}

      {editRecipeTarget && (
        <MenuItemRecipeForm
          menuItem={editRecipeTarget}
          onClose={() => {
            setEditRecipeTarget(null);
            fetchMenuItems();
          }}
        />
      )}

      <div className="rounded shadow divide-y space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-300 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div>
                <strong>
                  {item.name} - {item.type}
                </strong>
                <div className="text-gray-600 text-sm">
                  ${item.price} {item.description && `- ${item.description}`}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-sm bg-gray-200 rounded"
                onClick={() => setSelected(item)}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 text-sm bg-yellow-300 rounded"
                onClick={() => setEditRecipeTarget(item)}
              >
                Edit Recipe
              </button>

              <button
                className="px-3 py-1 text-sm bg-red-500 rounded"
                onClick={() => handleDelete(item.id)}
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
