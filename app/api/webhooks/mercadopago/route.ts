import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Webhook de Mercado Pago — LA fuente de verdad del estado de un pago.
 * La página /gracias nunca confirma nada; solo este webhook (o el panel de
 * Mercado Pago) dice si un pedido está pagado.
 *
 * Fase 1 (sin base de datos): se verifica la firma y se consulta el pago para
 * dejar rastro en logs; el panel de Mercado Pago es el registro operativo.
 * Fase 2: persistir en Postgres con tabla EventoWebhook (evento_id ÚNICO)
 * para idempotencia real, y actualizar Pedido.estado.
 */

// Idempotencia mínima en memoria para la fase 1 (se reinicia con el proceso).
const eventosVistos = new Set<string>();

function firmaValida(solicitud: Request, dataId: string): boolean {
  const secreto = process.env.MP_WEBHOOK_SECRET;
  if (!secreto) return false;

  const xSignature = solicitud.headers.get("x-signature") ?? "";
  const xRequestId = solicitud.headers.get("x-request-id") ?? "";

  const partes = Object.fromEntries(
    xSignature.split(",").map((p) => p.trim().split("=") as [string, string]),
  );
  const ts = partes["ts"];
  const v1 = partes["v1"];
  if (!ts || !v1) return false;

  // Manifiesto según la documentación de Mercado Pago
  const manifiesto = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const esperada = createHmac("sha256", secreto).update(manifiesto).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(esperada, "hex"), Buffer.from(v1, "hex"));
  } catch {
    return false;
  }
}

export async function POST(solicitud: Request) {
  const url = new URL(solicitud.url);
  const dataId = url.searchParams.get("data.id") ?? "";
  const tipo = url.searchParams.get("type") ?? "";

  if (!dataId || tipo !== "payment") {
    // Notificaciones que no son de pago se aceptan sin procesar
    return NextResponse.json({ ok: true });
  }

  if (!firmaValida(solicitud, dataId)) {
    return NextResponse.json({ error: "firma inválida" }, { status: 400 });
  }

  // Idempotencia: la pasarela reintenta; el mismo evento puede llegar varias veces
  if (eventosVistos.has(dataId)) {
    return NextResponse.json({ ok: true, repetido: true });
  }
  eventosVistos.add(dataId);

  try {
    const respuesta = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    });
    if (respuesta.ok) {
      const pago = await respuesta.json();
      console.log(
        `[MP] Pago ${dataId}: ${pago.status} · ref ${pago.external_reference} · $${pago.transaction_amount} MXN`,
      );
      // Fase 2: aquí se actualiza Pedido.estado según pago.status
      // (approved → pagado, pending/in_process → pendiente, rejected → fallido)
    }
  } catch (e) {
    console.error("[MP] No se pudo consultar el pago:", e);
    // Se responde 200 igual: la consulta puede reintentarse desde el panel
  }

  return NextResponse.json({ ok: true });
}
