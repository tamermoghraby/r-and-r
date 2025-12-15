"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "./_components/ExpenseForm";
import { Trash2, Plus } from "lucide-react";

type UnifiedExpense = {
  id: string;
  source: "expense" | "purchase";
  description: string;
  category: string;
  amount: number;
  date: string;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<UnifiedExpense[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    if (category !== "All") params.append("category", category);

    const res = await fetch(`/api/expenses/all?${params}`);
    const data = await res.json();
    setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const categories = [
    "All",
    "Ingredients",
    ...Array.from(new Set(expenses.map((e) => e.category).filter(Boolean))),
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Expenses</h1>
          <p className="text-sm text-gray-500">
            Track ingredient purchases & operational costs
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl shadow hover:opacity-90"
        >
          <Plus size={16} />
          New Expense
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Expenses"
          value={`$${total.toFixed(2)}`}
          accent="bg-red-500"
        />

        <StatCard
          label="Ingredient Purchases"
          value={`$${expenses
            .filter((e) => e.source === "purchase")
            .reduce((s, e) => s + e.amount, 0)
            .toFixed(2)}`}
          accent="bg-orange-500"
        />

        <StatCard
          label="Other Expenses"
          value={`$${expenses
            .filter((e) => e.source === "expense")
            .reduce((s, e) => s + e.amount, 0)
            .toFixed(2)}`}
          accent="bg-blue-500"
        />
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchExpenses}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Apply Filters
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {loading && (
          <div className="text-center py-10 text-gray-400">
            Loading expenses…
          </div>
        )}

        {!loading && expenses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No expenses found
          </div>
        )}

        {expenses.map((e) => (
          <div
            key={`${e.source}-${e.id}`}
            className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <div className="font-medium">{e.description}</div>

              <div className="text-xs text-gray-500 flex gap-2 items-center">
                <span>{new Date(e.date).toLocaleDateString()}</span>
                <span>· {e.category}</span>

                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    e.source === "purchase"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {e.source === "purchase"
                    ? "Ingredient Purchase"
                    : "Manual Expense"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="font-semibold text-red-600">
                ${e.amount.toFixed(2)}
              </div>

              <button
                onClick={async () => {
                  if (confirm("Delete this expense?")) {
                    await fetch(`/api/expenses/unified/${e.source}/${e.id}`, {
                      method: "DELETE",
                    });
                    fetchExpenses();
                  }
                }}
                className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <ExpenseForm
          onClose={() => setShowCreate(false)}
          onCreated={fetchExpenses}
        />
      )}
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm p-5 overflow-hidden">
      <div className={`absolute right-0 top-0 h-full w-1 ${accent}`} />
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
