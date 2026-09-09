import type { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-panel">
      <header className="bg-white border-b border-border">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-ink">Panel administrativo</p>
            <p className="text-xs text-muted">{session?.user?.email}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/contenido"
              className="text-sm font-semibold text-ink-soft hover:text-ink px-3 py-2 rounded-lg hover:bg-panel transition-colors"
            >
              Contenido
            </Link>
            <Link
              href="/admin/noticias"
              className="text-sm font-semibold text-ink-soft hover:text-ink px-3 py-2 rounded-lg hover:bg-panel transition-colors"
            >
              Noticias
            </Link>
            <Link
              href="/admin/momentos"
              className="text-sm font-semibold text-ink-soft hover:text-ink px-3 py-2 rounded-lg hover:bg-panel transition-colors"
            >
              Momentos
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-ink-soft hover:text-ink px-3 py-2 rounded-lg hover:bg-panel transition-colors"
            >
              Ver sitio
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">{children}</main>
    </div>
  );
}
