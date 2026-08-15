"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const [saindo, setSaindo] = useState(false);

  async function handleLogout() {
    try {
      setSaindo(true);

      await signOut({
        redirect: true,
        callbackUrl: "/admin/login",
      });
    } catch (error) {
      console.error("Erro ao sair:", error);
      setSaindo(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={saindo}
      className="text-sm font-medium text-gray-600 hover:text-red-600 disabled:text-gray-400 transition"
    >
      {saindo ? "Saindo..." : "Sair"}
    </button>
  );
}