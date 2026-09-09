"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm font-bold text-ink-soft hover:text-ink border border-border rounded-lg px-3.5 py-2 transition-colors"
    >
      Cerrar sesión
    </button>
  );
}
