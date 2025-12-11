"use client";

import { FiMenu } from "react-icons/fi";

export default function Header({ onToggleSidebar }) {
  return (
    <div className=" h-16 border-b flex items-center px-4 justify-between">
      <button onClick={onToggleSidebar} className="text-xl">
        <FiMenu />
      </button>

      <div className="font-medium">Admin Dashboard</div>
    </div>
  );
}
