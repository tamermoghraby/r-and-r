"use client";

import { useState, useEffect } from "react";

export default function MenuItemRecipeForm({ menuItem, onClose }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [isPending, setIsPending] = useState(false);

  // Fetch all ingredients for selection
  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then(setIngredients);

    // Initialize recipe from menuItem
    setRecipe(
      menuItem.recipe?.map((r) => ({
        ingredientId: r.ingredientId,
        name: r.ingredient.name,
        quantityRequired: r.quantityRequired,
      })) || []
    );
  }, [menuItem]);

  const addIngredient = () => {
    setRecipe([...recipe, { ingredientId: "", name: "", quantityRequired: 0 }]);
  };

  const updateIngredient = (index, field, value) => {
    const newRecipe = [...recipe];
    newRecipe[index][field] = value;

    // If ingredientId changed, update name automatically
    if (field === "ingredientId") {
      const ing = ingredients.find((i) => i.id === value);
      newRecipe[index].name = ing?.name || "";
    }

    setRecipe(newRecipe);
  };

  const removeIngredient = (index) => {
    const newRecipe = [...recipe];
    newRecipe.splice(index, 1);
    setRecipe(newRecipe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    // Send only ingredientId and quantityRequired
    await fetch(`/api/menu-items/${menuItem.id}/ingredients`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: recipe.map((r) => ({
          ingredientId: r.ingredientId,
          quantityRequired: Number(r.quantityRequired),
        })),
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow w-[600px] space-y-4 bg-white"
      >
        <h2 className="text-lg font-semibold">
          Edit Recipe for {menuItem.name}
        </h2>

        {recipe.map((r, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <select
              value={r.ingredientId}
              onChange={(e) =>
                updateIngredient(idx, "ingredientId", e.target.value)
              }
              className="border p-2 rounded flex-1"
              required
            >
              <option value="">Select Ingredient</option>
              {ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              step="0.01"
              value={r.quantityRequired}
              onChange={(e) =>
                updateIngredient(idx, "quantityRequired", e.target.value)
              }
              className="w-24 border p-2 rounded"
              placeholder="Qty"
              required
            />
            {/* Show the ingredient unit */}
            <span>
              {ingredients.find((ing) => ing.id === r.ingredientId)?.unit || ""}
            </span>

            <button
              type="button"
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => removeIngredient(idx)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          + Add Ingredient
        </button>

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
            {isPending ? "Saving..." : "Save Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}
