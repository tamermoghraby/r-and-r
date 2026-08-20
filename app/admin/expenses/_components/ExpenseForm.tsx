"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function ExpenseForm({ onClose, onCreated }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const submit = async () => {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount,
        category,
        expenseDate: date || undefined,
      }),
    });

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-semibold">New Expense</h2>

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          placeholder="Category (rent, gas, bills...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          onClick={submit}
          className="w-full bg-primary text-white py-2.5 rounded-xl"
        >
          Save Expense
        </button>
      </div>
    </div>
  );
}
