"use client";

import { useEffect, useState } from "react";

export default function IngredientHistory({ ingredient, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`/api/ingredients/${ingredient.id}/history`)
      .then((res) => res.json())
      .then(setHistory);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[600px] max-h-[80vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-3">
          Stock History — {ingredient.name}
        </h2>

        <button
          onClick={onClose}
          className="mb-4 px-3 py-1 bg-gray-200 rounded"
        >
          Close
        </button>

        <div className="space-y-3">
          {history.map((h) => (
            <div key={h.id} className="p-3 border rounded">
              <div>
                <strong>{h.changeAmount}</strong> ({h.reason})
              </div>
              {h.note && <div className="text-sm text-gray-600">{h.note}</div>}
              <div className="text-xs text-gray-500">
                {new Date(h.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
