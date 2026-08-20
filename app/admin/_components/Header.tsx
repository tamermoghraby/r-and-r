"use client";

import { FiMenu } from "react-icons/fi";

export default function Header({
  onToggleSidebar,
  user,
}: {
  onToggleSidebar: () => void;
  user: any;
}) {
  return (
    <div className="h-16 border-b flex items-center px-4 justify-between">
      <button onClick={onToggleSidebar} className="text-xl">
        <FiMenu />
      </button>

      <div className="text-sm text-gray-700">
        {user.username} · {user.role}
      </div>

      <button
        onClick={async () => {
          await fetch("/api/auth/logout");
          window.location.href = "/login";
        }}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
