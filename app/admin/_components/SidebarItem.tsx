"use client";

import Link from "next/link";

export default function SidebarItem({ href, icon, title, collapsed }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:text-black transition rounded-md"
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{title}</span>}
    </Link>
  );
}
