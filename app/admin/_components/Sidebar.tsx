"use client";

import SidebarItem from "./SidebarItem";
import {
  FiBox,
  FiShoppingBag,
  FiList,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

export default function Sidebar({
  collapsed,
  restaurantName,
}: {
  collapsed: boolean;
  restaurantName: string;
}) {
  return (
    <div
      className={`bg-gray-200 border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b">
        {!collapsed ? (
          <div className="text-center">
            <div className="font-bold text-sm">Restaurant</div>
            <div className="text-xs text-gray-600 truncate">
              {restaurantName}
            </div>
          </div>
        ) : (
          "R"
        )}
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
          href="/admin/analytics"
          title="Analytics"
          icon={<FiBarChart2 />}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}
