import type { Metadata } from "next";
import { SITIO } from "@/lib/config";
import { mxn } from "@/lib/formato";
import { linkContactoWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Envíos, pagos, cambios, tallas y facturación: respuestas claras de Sara Luz, ropa interior mexicana.",
};

export default function PaginaFAQ() {
  const FAQS: [string, string][] = [
    [
      "¿Cuánto tarda mi pedido?",
      `Preparamos tu pedido en 1 día hábil y llega en ${SITIO.diasEntrega} a casi todo México. Te compartimos tu número de guía en cuanto sale del taller.`,
    ],
    [
      "¿Cuánto cuesta el envío?",
      `${mxn(SITIO.costoEnvioCentavos)} a todo el país, y gratis en compras desde ${mxn(SITIO.envioGratisDesdeCentavos)}.`,
    ],
    [
      "¿Qué formas de pago aceptan?",
      "Tarjeta de crédito o débito, pago en efectivo en OXXO y transferencia SPEI — todo con Mercado Pago, sin registrarte. También puedes pedir por WhatsApp.",
    ],
    [
      "¿Puedo cambiar una prenda?",
      "Sí: 30 días para cambios por talla o defecto, con la prenda sin uso, con etiquetas y en su empaque, por higiene. El cambio por defecto de fábrica corre 100% por nuestra cuenta.",
    ],
    [
      "¿Cómo sé cuál es mi talla?",
      "Consulta la guía de tallas (está en el menú y en cada producto). Si sigues con duda, mándanos tus medidas por WhatsApp y te decimos la talla exacta.",
    ],
    [
      "¿De verdad todo está hecho en México?",
      `Sí. Diseñamos, cortamos y confeccionamos en nuestro propio taller, con un equipo profesional que lleva ${SITIO.aniosExperiencia}+ años en el oficio. No maquilamos fuera.`,
    ],
    [
      "¿Facturan?",
      "Claro. Al terminar tu compra escríbenos con tus datos fiscales y tu número de pedido; te enviamos tu CFDI en máximo 72 horas.",
    ],
    [
      "¿Venden por mayoreo?",
      "Sí, es parte importante de la casa. Visita la página de Mayoreo o escríbenos por WhatsApp para lista de precios y mínimos de compra.",
    ],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([pregunta, respuesta]) => ({
      "@type": "Question",
      name: pregunta,
      acceptedAnswer: { "@type": "Answer", text: respuesta },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-titulo text-4xl">Preguntas frecuentes</h1>
      <p className="mt-2 text-tinta-suave">
        Respuestas directas, sin vueltas. Si falta la tuya, escríbenos.
      </p>

      <div className="mt-8 divide-y divide-borde rounded-tarjeta border border-borde bg-superficie px-6">
        {FAQS.map(([pregunta, respuesta]) => (
          <details key={pregunta} className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium list-none text-[15px]">
              {pregunta}
              <span
                aria-hidden
                className="text-tinta-suave group-open:rotate-45 transition-transform duration-150 text-2xl leading-none shrink-0"
              >
                +
              </span>
            </summary>
            <p className="pt-2 pr-8 text-[15px] text-tinta-suave leading-relaxed">{respuesta}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={linkContactoWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-exito px-7 py-3.5 text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-150"
        >
          Mi pregunta no está aquí — WhatsApp
        </a>
      </div>
    </div>
  );
}
