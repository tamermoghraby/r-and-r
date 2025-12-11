"use client";

import Link from "next/link";
import SidebarItem from "./SidebarItem";
import {
  FiBox,
  FiShoppingBag,
  FiFileText,
  FiList,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

export default function Sidebar({ collapsed }) {
  return (
    <div
      className={`bg-gray-200 border-r h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b">
        {!collapsed ? <h1 className="font-bold text-xl">Admin</h1> : "A"}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <SidebarItem
          href="/admin/orders"
          title="Orders"
          icon={<FiShoppingBag />}
          collapsed={collapsed}
        />
        <SidebarItem
          href="/admin/ingredients"
          title="Ingredients"
          icon={<FiBox />}
          collapsed={collapsed}
        />
        <SidebarItem
          href="/admin/menu"
          title="Menu Items"
          icon={<FiList />}
          collapsed={collapsed}
        />
        <SidebarItem
          href="/admin/expenses"
          title="Expenses"
          icon={<FiDollarSign />}
          collapsed={collapsed}
        />
        <SidebarItem
          href="/admin/reports"
          title="Reports"
          icon={<FiBarChart2 />}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}
