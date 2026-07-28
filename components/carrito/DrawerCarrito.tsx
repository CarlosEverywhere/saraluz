"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCarrito } from "@/lib/carrito";
import { porSlug, destacados } from "@/lib/productos";
import { mxn } from "@/lib/formato";
import { SITIO } from "@/lib/config";
import { linkPedidoWhatsApp } from "@/lib/whatsapp";
import PlaceholderPrenda from "@/components/producto/PlaceholderPrenda";

export default function DrawerCarrito() {
  const carrito = useCarrito();
  const { items, abierto, cerrar, eliminado, deshacerEliminar } = carrito;

  useEffect(() => {
    function alTeclear(e: KeyboardEvent) {
      if (e.key === "Escape") cerrar();
    }
    if (abierto) {
      document.addEventListener("keydown", alTeclear);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto, cerrar]);

  if (!abierto) return null;

  const progreso = Math.min(
    100,
    Math.round((carrito.subtotalCentavos / SITIO.envioGratisDesdeCentavos) * 100),
  );

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Bolsa de compras">
      <button
        type="button"
        aria-label="Cerrar bolsa"
        onClick={cerrar}
        className="absolute inset-0 bg-carbon/50"
      />
      <aside className="absolute inset-y-0 right-0 w-full max-w-md bg-fondo shadow-flotante flex flex-col">
        <header className="flex items-center justify-between px-5 py-4 border-b border-borde">
          <h2 className="font-titulo text-xl">Tu bolsa ({carrito.totalPiezas})</h2>
          <button
            type="button"
            onClick={cerrar}
            className="p-2 rounded-control hover:bg-borde/40"
            aria-label="Cerrar bolsa"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* Progreso de envío gratis — patrón Skims */}
        <div className="px-5 py-3 border-b border-borde bg-superficie">
          {carrito.faltaParaEnvioGratis > 0 ? (
            <p className="text-sm">
              Te faltan <strong>{mxn(carrito.faltaParaEnvioGratis)}</strong> para el envío gratis
            </p>
          ) : (
            <p className="text-sm font-medium text-exito">Tu pedido tiene envío gratis 🎉</p>
          )}
          <div className="mt-2 h-1.5 rounded-full bg-borde overflow-hidden">
            <div
              className="h-full rounded-full bg-marca transition-[width] duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {eliminado && (
          <div className="mx-5 mt-3 flex items-center justify-between rounded-control bg-carbon text-white text-sm px-4 py-2.5">
            <span>Prenda eliminada</span>
            <button type="button" onClick={deshacerEliminar} className="font-semibold underline">
              Deshacer
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex-1 overflow-y-auto px-5 py-8">
            <p className="font-titulo text-2xl">Tu bolsa está vacía</p>
            <p className="mt-2 text-tinta-suave text-sm">
              Descubre lo nuevo de la temporada o nuestros favoritos de siempre.
            </p>
            <Link
              href="/novedades"
              onClick={cerrar}
              className="mt-5 inline-block rounded-full bg-acento px-6 py-3 text-white font-semibold text-sm hover:bg-acento-hover transition-colors duration-150"
            >
              Ver novedades
            </Link>
            <h3 className="mt-10 mb-4 font-titulo text-lg">Los más vendidos</h3>
            <ul className="grid grid-cols-2 gap-3">
              {destacados().slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link href={`/producto/${p.slug}`} onClick={cerrar} className="block group">
                    <PlaceholderPrenda producto={p} className="aspect-square rounded-control" />
                    <p className="mt-1.5 text-[13px] leading-tight group-hover:text-acento">
                      {p.nombre}
                    </p>
                    <p className="text-[13px] font-semibold">{mxn(p.precioCentavos)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 divide-y divide-borde">
              {items.map((item, i) => {
                const p = porSlug(item.slug);
                if (!p) return null;
                const idxColor = Math.max(0, p.colores.findIndex((c) => c.nombre === item.color));
                return (
                  <li key={`${item.slug}-${item.talla}-${item.color}`} className="py-4 flex gap-4">
                    <Link href={`/producto/${p.slug}`} onClick={cerrar} className="shrink-0">
                      <PlaceholderPrenda
                        producto={p}
                        variante={idxColor}
                        className="w-20 h-24 rounded-control"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{p.nombre}</p>
                      <p className="mt-0.5 text-[13px] text-tinta-suave">
                        Talla {item.talla} · {item.color}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-borde bg-superficie">
                          <button
                            type="button"
                            onClick={() => carrito.cambiarCantidad(i, item.cantidad - 1)}
                            className="px-2.5 py-1 text-lg leading-none hover:text-acento"
                            aria-label={`Quitar una pieza de ${p.nombre}`}
                          >
                            −
                          </button>
                          <span className="px-1 text-sm min-w-[1.5rem] text-center" aria-live="polite">
                            {item.cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() => carrito.cambiarCantidad(i, item.cantidad + 1)}
                            className="px-2.5 py-1 text-lg leading-none hover:text-acento"
                            aria-label={`Agregar una pieza de ${p.nombre}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => carrito.eliminar(i)}
                          className="text-[13px] text-tinta-suave underline hover:text-error"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold whitespace-nowrap">
                      {mxn(p.precioCentavos * item.cantidad)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-borde bg-superficie px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-tinta-suave">Subtotal (impuestos incluidos)</span>
                <span className="font-titulo text-xl">{mxn(carrito.subtotalCentavos)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={cerrar}
                className="block w-full rounded-full bg-acento py-3.5 text-center text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
              >
                Finalizar compra — {mxn(carrito.subtotalCentavos)}
              </Link>
              <a
                href={linkPedidoWhatsApp(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full border border-exito py-3 text-center text-exito font-semibold text-sm hover:bg-exito hover:text-white transition-colors duration-150"
              >
                Pedir por WhatsApp
              </a>
              <p className="text-center text-[12px] text-tinta-suave">
                Pago seguro con Mercado Pago · Tarjeta, OXXO y SPEI
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
