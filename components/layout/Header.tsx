"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCarrito } from "@/lib/carrito";
import { CATEGORIAS, DEPARTAMENTOS, type Departamento } from "@/lib/productos";

function MenuDepartamento({ dep }: { dep: Departamento }) {
  const info = DEPARTAMENTOS[dep];
  return (
    <li className="relative group">
      <Link
        href={`/tienda/${dep}`}
        className="inline-flex items-center gap-1 py-4 text-[15px] font-medium hover:text-acento transition-colors duration-150"
      >
        {info.nombre}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className="opacity-60">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-[opacity] duration-150 absolute left-1/2 -translate-x-1/2 top-full z-40 pt-1">
        <div className="bg-superficie border border-borde rounded-tarjeta shadow-flotante p-5 w-64">
          <p className="font-titulo italic text-tinta-suave text-sm mb-3">
            {info.marca}
          </p>
          <ul className="space-y-1">
            {info.categorias.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/tienda/${dep}?categoria=${cat}`}
                  className="block rounded-control px-3 py-2 text-[15px] hover:bg-fondo hover:text-acento transition-colors duration-150"
                >
                  {CATEGORIAS[cat].nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/tienda/${dep}`}
                className="block rounded-control px-3 py-2 text-[15px] font-semibold text-acento hover:bg-fondo transition-colors duration-150"
              >
                Ver todo {info.nombre.toLowerCase()} →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function Header() {
  const { totalPiezas, abrir } = useCarrito();
  const [menuMovil, setMenuMovil] = useState(false);
  const [consulta, setConsulta] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    if (!consulta.trim()) return;
    setMenuMovil(false);
    router.push(`/tienda?q=${encodeURIComponent(consulta.trim())}`);
  }

  const enlaces = [
    { href: "/novedades", texto: "Novedades" },
    { href: "/calidad", texto: "Calidad" },
    { href: "/nosotros", texto: "Nosotros" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-fondo/95 backdrop-blur border-b border-borde">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-4 h-16 sm:h-[72px]">
        {/* Menú móvil */}
        <button
          type="button"
          onClick={() => setMenuMovil(true)}
          className="lg:hidden -ml-1 p-2 rounded-control hover:bg-borde/40"
          aria-label="Abrir menú"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <Link href="/" className="shrink-0" aria-label="Sara Luz — inicio">
          <Image
            src="/marca/saraluz.png"
            alt="Confecciones Sara Luz"
            width={132}
            height={121}
            priority
            className="h-11 sm:h-13 w-auto"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block ml-4">
          <ul className="flex items-center gap-7">
            <MenuDepartamento dep="mujer" />
            <MenuDepartamento dep="caballero" />
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className={`py-4 text-[15px] font-medium transition-colors duration-150 hover:text-acento ${
                    pathname === e.href ? "text-acento" : ""
                  }`}
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1" />

        {/* Búsqueda escritorio */}
        <form onSubmit={buscar} role="search" className="hidden md:block">
          <label htmlFor="buscador" className="sr-only">
            Buscar productos
          </label>
          <input
            id="buscador"
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Buscar…"
            className="w-40 focus:w-56 transition-[width] duration-300 bg-superficie border border-borde rounded-full px-4 py-2 text-sm placeholder:text-tinta-suave/70"
          />
        </form>

        <button
          type="button"
          onClick={abrir}
          className="relative p-2 rounded-control hover:bg-borde/40 transition-colors duration-150"
          aria-label={`Abrir bolsa de compras, ${totalPiezas} artículos`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 8h12l-1 12a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 20L6 8Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {totalPiezas > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-marca text-white text-[11px] font-semibold rounded-full min-w-[18px] h-[18px] px-1 grid place-items-center">
              {totalPiezas}
            </span>
          )}
        </button>
      </div>

      {/* Panel móvil */}
      {menuMovil && (
        <div className="lg:hidden fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuMovil(false)}
            className="absolute inset-0 bg-carbon/50"
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-fondo shadow-flotante p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <Image src="/marca/saraluz.png" alt="Sara Luz" width={100} height={92} className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setMenuMovil(false)}
                className="p-2 rounded-control hover:bg-borde/40"
                aria-label="Cerrar menú"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={buscar} role="search" className="mb-5">
              <input
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar productos…"
                className="w-full bg-superficie border border-borde rounded-full px-4 py-2.5 text-sm"
                aria-label="Buscar productos"
              />
            </form>

            {(Object.keys(DEPARTAMENTOS) as Departamento[]).map((dep) => (
              <details key={dep} className="border-b border-borde py-1" open={dep === "mujer"}>
                <summary className="flex items-center justify-between py-3 font-medium cursor-pointer list-none">
                  {DEPARTAMENTOS[dep].nombre}
                  <span className="text-tinta-suave text-sm font-titulo italic">
                    {DEPARTAMENTOS[dep].marca}
                  </span>
                </summary>
                <ul className="pb-3 space-y-1">
                  {DEPARTAMENTOS[dep].categorias.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/tienda/${dep}?categoria=${cat}`}
                        onClick={() => setMenuMovil(false)}
                        className="block px-3 py-2 rounded-control hover:bg-borde/40"
                      >
                        {CATEGORIAS[cat].nombre}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/tienda/${dep}`}
                      onClick={() => setMenuMovil(false)}
                      className="block px-3 py-2 font-semibold text-acento"
                    >
                      Ver todo →
                    </Link>
                  </li>
                </ul>
              </details>
            ))}

            <ul className="mt-4 space-y-1">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    onClick={() => setMenuMovil(false)}
                    className="block px-3 py-2.5 rounded-control font-medium hover:bg-borde/40"
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
