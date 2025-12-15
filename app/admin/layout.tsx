"use client";

import { useState, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import { ToastProvider } from "@/components/Toast";

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
    <ToastProvider>
      <div className="flex bg-white text-black">
        <Sidebar collapsed={collapsed} />

        <div className="flex-1 flex flex-col">
          <Header onToggleSidebar={toggleSidebar} />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
