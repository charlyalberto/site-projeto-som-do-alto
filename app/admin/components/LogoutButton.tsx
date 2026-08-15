"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm font-medium text-gray-600 hover:text-red-600 transition"
    >
      Sair
    </button>
  );
}