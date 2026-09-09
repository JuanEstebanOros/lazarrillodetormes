"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#sobre-nosotros", label: "Sobre nosotros" },
  { href: "#nuestros-simbolos", label: "Nuestros símbolos" },
  { href: "#oferta-educativa", label: "Oferta educativa" },
  { href: "#por-que-elegirnos", label: "Por qué elegirnos" },
  { href: "#momentos-lazarillo", label: "Momentos Lazarillo" },
  { href: "#noticias", label: "Noticias" },
  { href: "#contacto", label: "Contacto" },
  { href: "#admisiones", label: "Admisiones" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-[0_2px_12px_rgba(51,49,44,0.04)]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-6">
        <Link href="#inicio" className="flex items-center gap-3 text-ink shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="Logo Institución Educativa Lazarillo de Tormes"
            width={100}
            height={100}
            className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded-full object-cover shrink-0 bg-panel"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display font-bold text-[15px]">Institución Educativa</span>
            <span className="font-display font-bold text-[15px] text-gold">Lazarillo de Tormes</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 lg:gap-7 flex-wrap text-[15px] font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link px-1 py-1.5">
              {link.label}
            </a>
          ))}
          <Link href="/admin/login" className="login-btn">
            Iniciar sesión
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="lg:hidden flex items-center justify-center w-10 h-10 shrink-0 text-ink"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border px-5 sm:px-8 py-3 flex flex-col text-[15px] font-medium bg-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-link py-3 border-b border-border/70"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="login-btn mt-4 mb-1 mx-auto"
          >
            Iniciar sesión
          </Link>
        </nav>
      )}
    </header>
  );
}
