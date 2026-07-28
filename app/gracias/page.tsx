import type { Metadata } from "next";
import Link from "next/link";
import { SITIO } from "@/lib/config";
import { linkContactoWhatsApp } from "@/lib/whatsapp";
import VaciarCarrito from "./vaciar-carrito";

export const metadata: Metadata = {
  title: "Gracias por tu compra",
  robots: { index: false },
};

/**
 * Página de retorno tras el pago. NO confirma el pago: la confirmación real
 * es el webhook de Mercado Pago y el correo que la pasarela envía al cliente.
 */
export default async function PaginaGracias({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; estado?: string }>;
}) {
  const { ref, estado } = await searchParams;
  const pendiente = estado === "pendiente";

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-20 text-center">
      <VaciarCarrito />
      <p aria-hidden className="font-titulo text-6xl text-marca">
        {pendiente ? "…" : "¡Gracias!"}
      </p>
      <h1 className="mt-4 font-titulo text-3xl">
        {pendiente ? "Tu pago está en proceso" : "Recibimos tu pedido"}
      </h1>
      {ref && (
        <p className="mt-2 text-sm text-tinta-suave">
          Referencia: <strong className="text-tinta">{ref}</strong>
        </p>
      )}
      <p className="mt-4 text-tinta-suave leading-relaxed">
        {pendiente
          ? "En cuanto tu pago se acredite (OXXO y SPEI pueden tardar unas horas), Mercado Pago te enviará la confirmación a tu correo y nosotros prepararemos tu pedido."
          : "Mercado Pago te envía la confirmación de pago a tu correo. En cuanto se acredite, preparamos tu pedido en el taller y te compartimos tu guía de envío."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/tienda"
          className="rounded-full bg-acento px-7 py-3.5 text-white font-semibold text-sm hover:bg-acento-hover transition-colors duration-150"
        >
          Seguir comprando
        </Link>
        <a
          href={linkContactoWhatsApp(
            ref ? `tengo una duda sobre mi pedido ${ref}.` : "tengo una duda sobre mi pedido.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-borde px-7 py-3.5 font-semibold text-sm hover:border-tinta transition-colors duration-150"
        >
          Dudas por WhatsApp
        </a>
      </div>
      <p className="mt-8 text-[13px] text-tinta-suave">
        Entrega estimada: {SITIO.diasEntrega} a partir de la acreditación del pago.
      </p>
    </div>
  );
}
