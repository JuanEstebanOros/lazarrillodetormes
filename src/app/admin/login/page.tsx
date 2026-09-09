import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm bg-white border border-border rounded-2xl shadow-sm p-8">
        <h1 className="font-display text-2xl font-bold text-ink mb-1">Panel administrativo</h1>
        <p className="text-sm text-muted mb-6">Institución Educativa Lazarillo de Tormes</p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
