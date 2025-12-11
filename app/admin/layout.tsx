"use client";

import { useState, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebar-collapsed", String(newValue));
      return newValue;
    });
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="p-6 overflow-auto min-h-screen">{children}</div>
      </div>
    </div>
  );
}
