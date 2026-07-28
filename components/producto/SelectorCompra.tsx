"use client";

import { useState } from "react";
import type { Producto } from "@/lib/productos";
import { useCarrito } from "@/lib/carrito";
import { mxn } from "@/lib/formato";
import { linkContactoWhatsApp } from "@/lib/whatsapp";

export default function SelectorCompra({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [color, setColor] = useState(producto.colores[0]?.nombre ?? "");
  const [talla, setTalla] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agregando, setAgregando] = useState(false);

  function alAgregar() {
    if (!talla) {
      setError("Elige tu talla para continuar");
      return;
    }
    setError(null);
    setAgregando(true);
    agregar({ slug: producto.slug, talla, color });
    // microtransición para que el botón comunique la acción
    setTimeout(() => setAgregando(false), 400);
  }

  return (
    <div className="mt-6">
      {/* Color */}
      <fieldset>
        <legend className="text-sm font-medium">
          Color: <span className="text-tinta-suave font-normal">{color}</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {producto.colores.map((c) => (
            <button
              key={c.nombre}
              type="button"
              onClick={() => setColor(c.nombre)}
              aria-label={`Color ${c.nombre}`}
              aria-pressed={color === c.nombre}
              title={c.nombre}
              className={`h-9 w-9 rounded-full border-2 transition-transform duration-150 hover:scale-105 ${
                color === c.nombre ? "border-acento ring-2 ring-acento/30" : "border-borde"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>

      {/* Talla */}
      <fieldset className="mt-5">
        <legend className="flex w-full items-center justify-between text-sm font-medium">
          Talla
          <a href="/guia-de-tallas" className="text-acento underline text-[13px] font-normal">
            Guía de tallas
          </a>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {producto.tallas.map((t) => {
            const agotada = producto.tallasAgotadas?.includes(t);
            return (
              <button
                key={t}
                type="button"
                disabled={agotada}
                onClick={() => {
                  setTalla(t);
                  setError(null);
                }}
                aria-pressed={talla === t}
                className={`min-w-12 rounded-control border px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  agotada
                    ? "border-borde text-tinta-suave/50 line-through cursor-not-allowed bg-borde/20"
                    : talla === t
                      ? "border-acento bg-acento text-white"
                      : "border-borde bg-superficie hover:border-tinta"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        {producto.tallasAgotadas?.length ? (
          <p className="mt-2 text-[13px] text-tinta-suave">
            ¿Tu talla está agotada?{" "}
            <a
              href={linkContactoWhatsApp(
                `quiero que me avisen cuando haya talla ${producto.tallasAgotadas.join("/")} de "${producto.nombre}".`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-acento underline"
            >
              Te avisamos cuando regrese
            </a>
          </p>
        ) : null}
      </fieldset>

      {error && (
        <p role="alert" className="mt-4 rounded-control bg-error/10 text-error text-sm px-4 py-2.5">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={alAgregar}
        disabled={agregando}
        className="mt-5 w-full rounded-full bg-acento py-4 text-white font-semibold text-[15px] hover:bg-acento-hover transition-colors duration-150 disabled:opacity-70"
      >
        {agregando ? "Agregando…" : `Agregar a la bolsa — ${mxn(producto.precioCentavos)}`}
      </button>
    </div>
  );
}
