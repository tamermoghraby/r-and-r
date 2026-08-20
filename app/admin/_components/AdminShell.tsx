"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminShell({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };

  return (
    <div className="flex bg-white text-black min-h-screen">
      <Sidebar collapsed={collapsed} restaurantName={user.restaurant.name} />

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} user={user} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
