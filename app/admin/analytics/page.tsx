"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Percent,
} from "lucide-react";

type Analytics = {
  revenue: number;
  expenses: number;
  profit: number;
  ordersCount: number;
  avgOrderValue: number;
  revenueByDay: { date: string; amount: number }[];
  expensesByCategory: { category: string; amount: number }[];
  topIngredients: { name: string; cost: number }[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchAnalytics = async () => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const res = await fetch(`/api/analytics/overview?${params}`);
    setData(await res.json());
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="py-20 text-center text-gray-400">Loading analytics…</div>
    );
  }

  const profitPositive = data.profit >= 0;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-gray-500">
            Business performance & financial insights
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={fetchAnalytics}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Apply
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Kpi
          label="Revenue"
          value={`$${data.revenue.toFixed(2)}`}
          icon={<DollarSign />}
          accent="bg-green-500"
        />
        <Kpi
          label="Expenses"
          value={`$${data.expenses.toFixed(2)}`}
          icon={<TrendingDown />}
          accent="bg-red-500"
        />
        <Kpi
          label="Profit"
          value={`$${data.profit.toFixed(2)}`}
          icon={profitPositive ? <TrendingUp /> : <TrendingDown />}
          accent={profitPositive ? "bg-green-600" : "bg-red-600"}
        />
        <Kpi
          label="Orders"
          value={data.ordersCount}
          icon={<ShoppingCart />}
          accent="bg-blue-500"
        />
        <Kpi
          label="Avg Order"
          value={`$${data.avgOrderValue.toFixed(2)}`}
          icon={<Percent />}
          accent="bg-purple-500"
        />
      </div>

      {/* REVENUE BY DAY */}
      <Section title="Revenue Trend">
        <div className="space-y-2">
          {data.revenueByDay.map((d) => (
            <div key={d.date} className="flex items-center gap-3">
              <span className="w-24 text-xs text-gray-500">
                {new Date(d.date).toLocaleDateString()}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(d.amount / data.revenue) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                ${d.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPENSES BY CATEGORY */}
      <Section title="Expenses by Category">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.expensesByCategory.map((c) => (
            <div
              key={c.category}
              className="bg-gray-50 rounded-xl p-4 flex justify-between"
            >
              <span className="font-medium">{c.category}</span>
              <span className="text-red-600 font-semibold">
                ${c.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* TOP INGREDIENT COSTS */}
      <Section title="Top Ingredient Costs">
        <div className="space-y-2">
          {data.topIngredients.map((i) => (
            <div
              key={i.name}
              className="flex justify-between bg-white rounded-xl p-3 shadow-sm"
            >
              <span>{i.name}</span>
              <span className="font-semibold text-orange-600">
                ${i.cost.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Kpi({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm p-5 overflow-hidden">
      <div className={`absolute right-0 top-0 h-full w-1 ${accent}`} />
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}
