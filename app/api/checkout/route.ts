import { NextResponse } from "next/server";
import { z } from "zod";
import { calcularTotales } from "@/lib/precios";
import { SITIO } from "@/lib/config";

/**
 * Crea la preferencia de pago en Mercado Pago.
 * El cliente manda slugs y cantidades; los importes se calculan AQUÍ,
 * a partir del catálogo. Nunca se confía en precios del navegador.
 */

const esquema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1).max(100),
        talla: z.string().min(1).max(10),
        color: z.string().min(1).max(40),
        cantidad: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(30),
  cliente: z.object({
    nombre: z.string().trim().min(2).max(120),
    correo: z.string().trim().email().max(160),
    telefono: z.string().trim().min(10).max(15),
  }),
});

export async function POST(solicitud: Request) {
  let datos: z.infer<typeof esquema>;
  try {
    datos = esquema.parse(await solicitud.json());
  } catch {
    return NextResponse.json(
      { error: "DATOS_INVALIDOS", mensaje: "Revisa tus datos e intenta de nuevo." },
      { status: 400 },
    );
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error: "PAGOS_NO_CONFIGURADOS",
        mensaje:
          "El pago en línea aún no está activado. Puedes completar tu pedido por WhatsApp mientras tanto.",
      },
      { status: 503 },
    );
  }

  let totales;
  try {
    totales = calcularTotales(datos.items);
  } catch (e) {
    return NextResponse.json(
      {
        error: "CARRITO_INVALIDO",
        mensaje: e instanceof Error ? e.message : "Hay un problema con tu carrito.",
      },
      { status: 400 },
    );
  }

  const referencia = `SL-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const preferencia = {
    items: totales.lineas.map((l) => ({
      id: l.slug,
      title: `${l.nombre} (${l.talla} / ${l.color})`,
      quantity: l.cantidad,
      currency_id: "MXN",
      unit_price: l.precioUnitarioCentavos / 100,
    })),
    ...(totales.envioCentavos > 0 && {
      shipments: { cost: totales.envioCentavos / 100, mode: "not_specified" },
    }),
    payer: {
      name: datos.cliente.nombre,
      email: datos.cliente.correo,
      phone: { number: datos.cliente.telefono },
    },
    external_reference: referencia,
    back_urls: {
      success: `${SITIO.url}/gracias?ref=${referencia}`,
      pending: `${SITIO.url}/gracias?ref=${referencia}&estado=pendiente`,
      failure: `${SITIO.url}/checkout?error=pago`,
    },
    auto_return: "approved",
    notification_url: `${SITIO.url}/api/webhooks/mercadopago`,
    statement_descriptor: "SARA LUZ",
  };

  try {
    const respuesta = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": referencia,
      },
      body: JSON.stringify(preferencia),
    });

    if (!respuesta.ok) {
      console.error("Mercado Pago rechazó la preferencia:", await respuesta.text());
      return NextResponse.json(
        {
          error: "ERROR_PASARELA",
          mensaje:
            "No pudimos iniciar el pago. No se te cobró nada; intenta de nuevo o pide por WhatsApp.",
        },
        { status: 502 },
      );
    }

    const json = await respuesta.json();
    return NextResponse.json({ url: json.init_point as string, referencia });
  } catch (e) {
    console.error("Error de red hacia Mercado Pago:", e);
    return NextResponse.json(
      {
        error: "ERROR_RED",
        mensaje:
          "No pudimos conectar con la pasarela de pago. No se te cobró nada; intenta en un momento.",
      },
      { status: 502 },
    );
  }
}
