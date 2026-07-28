"use client";

import Link from "next/link";
import { useCarrito } from "@/lib/carrito";
import { porSlug, destacados } from "@/lib/productos";
import { mxn } from "@/lib/formato";
import { SITIO } from "@/lib/config";
import { linkPedidoWhatsApp } from "@/lib/whatsapp";
import PlaceholderPrenda from "@/components/producto/PlaceholderPrenda";
import ProductCard from "@/components/producto/ProductCard";

export default function PaginaCarrito() {
  const carrito = useCarrito();
  const { items } = carrito;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="font-titulo text-4xl">Tu bolsa está vacía</h1>
          <p className="mt-3 text-tinta-suave">
            Descubre lo nuevo de la temporada o los básicos que nunca fallan.
          </p>
          <Link
            href="/tienda"
            className="mt-6 inline-block rounded-full bg-acento px-8 py-4 text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
          >
            Ir a la tienda
          </Link>
        </div>
        <section className="mt-16" aria-labelledby="sugerencias">
          <h2 id="sugerencias" className="font-titulo text-2xl mb-5">
            Los más vendidos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destacados().slice(0, 4).map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const envioGratis = carrito.subtotalCentavos >= SITIO.envioGratisDesdeCentavos;
  const envio = envioGratis ? 0 : SITIO.costoEnvioCentavos;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-titulo text-4xl">Tu bolsa ({carrito.totalPiezas})</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] items-start">
        <ul className="divide-y divide-borde border-y border-borde">
          {items.map((item, i) => {
            const p = porSlug(item.slug);
            if (!p) return null;
            const idxColor = Math.max(0, p.colores.findIndex((c) => c.nombre === item.color));
            return (
              <li key={`${item.slug}-${item.talla}-${item.color}`} className="py-5 flex gap-5">
                <Link href={`/producto/${p.slug}`} className="shrink-0">
                  <PlaceholderPrenda
                    producto={p}
                    variante={idxColor}
                    className="w-24 h-30 sm:w-28 sm:h-35 rounded-control"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/producto/${p.slug}`} className="font-medium hover:text-acento">
                    {p.nombre}
                  </Link>
                  <p className="mt-0.5 text-sm text-tinta-suave">
                    Talla {item.talla} · {item.color} · {mxn(p.precioCentavos)} c/u
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="inline-flex items-center rounded-full border border-borde bg-superficie">
                      <button
                        type="button"
                        onClick={() => carrito.cambiarCantidad(i, item.cantidad - 1)}
                        className="px-3 py-1.5 text-lg leading-none hover:text-acento"
                        aria-label={`Quitar una pieza de ${p.nombre}`}
                      >
                        −
                      </button>
                      <span className="px-1 min-w-[2rem] text-center" aria-live="polite">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => carrito.cambiarCantidad(i, item.cantidad + 1)}
                        className="px-3 py-1.5 text-lg leading-none hover:text-acento"
                        aria-label={`Agregar una pieza de ${p.nombre}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => carrito.eliminar(i)}
                      className="text-sm text-tinta-suave underline hover:text-error"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="font-semibold whitespace-nowrap">
                  {mxn(p.precioCentavos * item.cantidad)}
                </p>
              </li>
            );
          })}
        </ul>

        <aside className="rounded-tarjeta border border-borde bg-superficie p-6 lg:sticky lg:top-24">
          <h2 className="font-titulo text-xl">Resumen</h2>
          {carrito.eliminado && (
            <div className="mt-3 flex items-center justify-between rounded-control bg-carbon text-white text-sm px-4 py-2.5">
              <span>Prenda eliminada</span>
              <button
                type="button"
                onClick={carrito.deshacerEliminar}
                className="font-semibold underline"
              >
                Deshacer
              </button>
            </div>
          )}
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-tinta-suave">Subtotal</dt>
              <dd>{mxn(carrito.subtotalCentavos)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-tinta-suave">Envío</dt>
              <dd className={envioGratis ? "text-exito font-medium" : ""}>
                {envioGratis ? "Gratis" : mxn(envio)}
              </dd>
            </div>
            {!envioGratis && (
              <p className="text-[13px] text-tinta-suave">
                Agrega {mxn(carrito.faltaParaEnvioGratis)} más y el envío va por nuestra cuenta.
              </p>
            )}
            <div className="flex justify-between border-t border-borde pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-titulo text-xl">{mxn(carrito.subtotalCentavos + envio)}</dd>
            </div>
          </dl>
          <p className="mt-1 text-[12px] text-tinta-suave">Impuestos incluidos.</p>
          <Link
            href="/checkout"
            className="mt-5 block w-full rounded-full bg-acento py-3.5 text-center text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
          >
            Finalizar compra
          </Link>
          <a
            href={linkPedidoWhatsApp(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full rounded-full border border-exito py-3 text-center text-exito font-semibold text-sm hover:bg-exito hover:text-white transition-colors duration-150"
          >
            Pedir por WhatsApp
          </a>
          <p className="mt-3 text-center text-[12px] text-tinta-suave">
            Pago seguro con Mercado Pago · Tarjeta, OXXO y SPEI
          </p>
        </aside>
      </div>
    </div>
  );
}
