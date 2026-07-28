"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCarrito } from "@/lib/carrito";
import { porSlug } from "@/lib/productos";
import { mxn } from "@/lib/formato";
import { SITIO } from "@/lib/config";
import { linkPedidoWhatsApp } from "@/lib/whatsapp";

function Campo({
  id,
  etiqueta,
  children,
}: {
  id: string;
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {etiqueta}
      </label>
      {children}
    </div>
  );
}

const claseInput =
  "mt-1.5 w-full rounded-control border border-borde bg-superficie px-4 py-3 text-sm";

function Checkout() {
  const carrito = useCarrito();
  const searchParams = useSearchParams();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState<"inicial" | "procesando" | "error">("inicial");
  const [mensajeError, setMensajeError] = useState<string | null>(
    searchParams.get("error") === "pago"
      ? "El pago no se completó. No te preocupes: no se hizo ningún cargo. Puedes intentar de nuevo."
      : null,
  );

  const envioGratis = carrito.subtotalCentavos >= SITIO.envioGratisDesdeCentavos;
  const envio = envioGratis ? 0 : SITIO.costoEnvioCentavos;
  const total = carrito.subtotalCentavos + envio;

  async function pagar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === "procesando") return; // evita doble clic → pedidos duplicados
    setEstado("procesando");
    setMensajeError(null);

    try {
      const respuesta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: carrito.items,
          cliente: { nombre, correo, telefono },
        }),
      });
      const json = await respuesta.json();

      if (!respuesta.ok) {
        setMensajeError(json.mensaje ?? "Algo salió mal. Intenta de nuevo.");
        setEstado("error");
        return;
      }

      // Redirige a Mercado Pago; la dirección de envío se captura allá
      window.location.href = json.url;
    } catch {
      setMensajeError(
        "No pudimos conectar con el servidor. Revisa tu internet e intenta de nuevo — no se hizo ningún cargo.",
      );
      setEstado("error");
    }
  }

  if (carrito.items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-titulo text-3xl">No hay nada que pagar todavía</h1>
        <p className="mt-3 text-tinta-suave">Tu bolsa está vacía.</p>
        <Link
          href="/tienda"
          className="mt-6 inline-block rounded-full bg-acento px-8 py-4 text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <h1 className="font-titulo text-4xl">Finalizar compra</h1>
      <p className="mt-2 text-tinta-suave text-sm">
        Pagas en el sitio seguro de Mercado Pago: tarjeta, OXXO o SPEI. Nosotros nunca vemos los
        datos de tu tarjeta.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] items-start">
        <form onSubmit={pagar} className="space-y-5">
          <h2 className="font-titulo text-2xl">Tus datos</h2>

          <Campo id="ck-nombre" etiqueta="Nombre completo">
            <input
              id="ck-nombre"
              required
              minLength={2}
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={claseInput}
              placeholder="Como aparece en tu identificación"
            />
          </Campo>

          <Campo id="ck-correo" etiqueta="Correo electrónico">
            <input
              id="ck-correo"
              type="email"
              required
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={claseInput}
              placeholder="Aquí llega tu confirmación de pago"
            />
          </Campo>

          <Campo id="ck-telefono" etiqueta="Teléfono (10 dígitos)">
            <input
              id="ck-telefono"
              type="tel"
              required
              pattern="[0-9]{10}"
              autoComplete="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={claseInput}
              placeholder="Para avisarte de tu envío"
            />
          </Campo>

          <p className="text-[13px] text-tinta-suave">
            La dirección de entrega se captura en el paso de pago. Al continuar aceptas los{" "}
            <Link href="/terminos" className="underline">
              términos
            </Link>{" "}
            y el{" "}
            <Link href="/aviso-de-privacidad" className="underline">
              aviso de privacidad
            </Link>
            .
          </p>

          {mensajeError && (
            <div
              role="alert"
              className="rounded-control bg-error/10 border border-error/30 text-error text-sm px-4 py-3"
            >
              <p>{mensajeError}</p>
              <a
                href={linkPedidoWhatsApp(carrito.items)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-semibold underline"
              >
                Completar mi pedido por WhatsApp
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={estado === "procesando"}
            className="w-full rounded-full bg-acento py-4 text-white font-semibold hover:bg-acento-hover transition-colors duration-150 disabled:opacity-70"
          >
            {estado === "procesando" ? "Conectando con Mercado Pago…" : `Pagar ${mxn(total)}`}
          </button>
        </form>

        <aside className="rounded-tarjeta border border-borde bg-superficie p-6">
          <h2 className="font-titulo text-xl">Tu pedido</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {carrito.items.map((item) => {
              const p = porSlug(item.slug);
              if (!p) return null;
              return (
                <li
                  key={`${item.slug}-${item.talla}-${item.color}`}
                  className="flex justify-between gap-3"
                >
                  <span className="text-tinta-suave">
                    {item.cantidad}× {p.nombre}{" "}
                    <span className="whitespace-nowrap">
                      ({item.talla} / {item.color})
                    </span>
                  </span>
                  <span className="whitespace-nowrap font-medium">
                    {mxn(p.precioCentavos * item.cantidad)}
                  </span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-4 space-y-2 text-sm border-t border-borde pt-4">
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
            <div className="flex justify-between border-t border-borde pt-3">
              <dt className="font-semibold">Total</dt>
              <dd className="font-titulo text-xl">{mxn(total)}</dd>
            </div>
          </dl>
          <Link href="/carrito" className="mt-4 inline-block text-sm text-acento underline">
            Editar mi bolsa
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default function PaginaCheckout() {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
